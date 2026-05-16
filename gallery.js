(function () {
  const galleryEl = document.getElementById('gallery');
  const loadingEl = document.getElementById('loading');
  const errorEl = document.getElementById('error');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxFullsize = document.getElementById('lightbox-fullsize');
  const lightboxClose = document.querySelector('.lightbox-close');

  var params = new URLSearchParams(location.search);
  var collectionId = window.GALLERY_COLLECTION || params.get('c') || 'warmaster_revolution';
  var galleryId = window.GALLERY_ID || params.get('g') || null;

  function showError(msg) {
    loadingEl.hidden = true;
    errorEl.textContent = msg;
    errorEl.hidden = false;
  }

  function resolveSrc(src) {
    if (!src || /^(https?:|\/)/.test(src)) return src;
    return collectionId + '/' + src;
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

  var jsonUrl = galleryId
    ? collectionId + '/gallery-' + galleryId + '.json'
    : collectionId + '/gallery.json';

  function setGalleryMeta(title, description, collectionTitle) {
    var titleEl = document.getElementById('gallery-title');
    var descEl = document.getElementById('gallery-description');
    var pageTitle = document.getElementById('page-title');
    if (titleEl && title) titleEl.textContent = title;
    if (descEl) descEl.textContent = description || '';
    if (pageTitle && title) {
      var suffix = collectionTitle ? collectionTitle + ' Papercraft' : 'Warmaster Papercraft';
      pageTitle.textContent = title + ' – ' + suffix;
    }
  }

  var metaPromise = galleryId
    ? fetch('collections.json')
        .then(function (r) {
          return r.ok ? r.json() : [];
        })
        .then(function (collections) {
          var collection = collections.find(function (x) {
            return x.id === collectionId;
          });
          var galleriesUrl = collection ? collection.galleries : collectionId + '/galleries.json';
          return fetch(galleriesUrl)
            .then(function (r) {
              return r.ok ? r.json() : [];
            })
            .then(function (list) {
              var g = list.find(function (x) {
                return (x.id || x.slug) === galleryId;
              });
              if (g) {
                setGalleryMeta(g.title, g.description, collection ? collection.title : null);
              }
            });
        })
        .catch(function () {})
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
        const rawSrc = typeof item === 'string' ? item : (item.src || item.url || item.path);
        const caption = typeof item === 'string' ? '' : (item.caption || item.title || '');
        if (!rawSrc) return;
        const src = resolveSrc(rawSrc);
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
