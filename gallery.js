(function () {
  const galleryEl = document.getElementById('gallery');
  const loadingEl = document.getElementById('loading');
  const errorEl = document.getElementById('error');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxFullsize = document.getElementById('lightbox-fullsize');
  const lightboxClose = document.querySelector('.lightbox-close');

  function showError(msg) {
    loadingEl.hidden = true;
    errorEl.textContent = msg;
    errorEl.hidden = false;
  }

  function openLightbox(src, caption) {
    lightboxImg.src = src;
    lightboxImg.alt = caption || '';
    lightboxCaption.textContent = caption || '';
    if (lightboxFullsize) {
      lightboxFullsize.href = src;
    }
    lightbox.hidden = false;
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });

  var galleryId = window.GALLERY_ID;
  var jsonUrl = galleryId ? 'gallery-' + galleryId + '.json' : 'gallery.json';

  function setGalleryMeta(title, description) {
    var titleEl = document.getElementById('gallery-title');
    var descEl = document.getElementById('gallery-description');
    var pageTitle = document.getElementById('page-title');
    if (titleEl && title) titleEl.textContent = title;
    if (descEl) descEl.textContent = description || '';
    if (pageTitle && title) pageTitle.textContent = title + ' – Warmaster Revolution Papercraft';
  }

  var metaPromise = galleryId
    ? fetch('galleries.json').then(function (r) { return r.ok ? r.json() : []; }).then(function (list) {
        var g = list.find(function (x) { return (x.id || x.slug) === galleryId; });
        if (g) setGalleryMeta(g.title, g.description);
      }).catch(function () {})
    : Promise.resolve();

  fetch(jsonUrl)
    .then(function (res) {
      if (!res.ok) throw new Error('Unable to load gallery.');
      return res.json();
    })
    .then(function (data) {
      const items = Array.isArray(data) ? data : (data.images || data.items || []);
      loadingEl.hidden = true;
      if (items.length === 0) {
        showError('This gallery has no images.');
        return;
      }
      metaPromise.then(function () {});
      items.forEach(function (item) {
        const src = typeof item === 'string' ? item : (item.src || item.url || item.path);
        const caption = typeof item === 'string' ? '' : (item.caption || item.title || '');
        if (!src) return;
        const a = document.createElement('a');
        a.href = src;
        a.classList.add('gallery-item');
        a.setAttribute('data-caption', caption);
        a.addEventListener('click', function (e) {
          e.preventDefault();
          openLightbox(src, caption);
        });
        const img = document.createElement('img');
        img.src = src;
        img.alt = caption || 'Gallery image';
        img.loading = 'lazy';
        a.appendChild(img);
        if (caption) {
          const capEl = document.createElement('span');
          capEl.className = 'caption';
          capEl.textContent = caption;
          a.appendChild(capEl);
        }
        galleryEl.appendChild(a);
      });
    })
    .catch(function () {
      showError('Unable to load this gallery.');
    });
})();
