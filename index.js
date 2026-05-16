(function () {
  const listEl = document.getElementById('galleries');
  const loadingEl = document.getElementById('loading');
  const errorEl = document.getElementById('error');

  function showError(msg) {
    loadingEl.hidden = true;
    errorEl.textContent = msg;
    errorEl.hidden = false;
  }

  function escapeHtml(s) {
    const div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  fetch('collections.json')
    .then(function (res) {
      if (!res.ok) throw new Error('Unable to load collections.');
      return res.json();
    })
    .then(function (collections) {
      if (!collections.length) {
        showError('No collections available.');
        return;
      }
      return Promise.all(
        collections.map(function (collection) {
          return fetch(collection.galleries)
            .then(function (res) {
              if (!res.ok) throw new Error('Unable to load galleries.');
              return res.json();
            })
            .then(function (galleries) {
              return { collection: collection, galleries: galleries };
            });
        })
      );
    })
    .then(function (sections) {
      loadingEl.hidden = true;
      var hasGalleries = sections.some(function (s) {
        return s.galleries.length > 0;
      });
      if (!hasGalleries) {
        showError('No galleries available.');
        return;
      }
      sections.forEach(function (section) {
        if (!section.galleries.length) return;
        const sectionEl = document.createElement('section');
        sectionEl.className = 'gallery-collection';
        sectionEl.innerHTML =
          '<h2 class="collection-title">' + escapeHtml(section.collection.title) + '</h2>';
        const gridEl = document.createElement('div');
        gridEl.className = 'galleries-list';
        section.galleries.forEach(function (g) {
          const id = g.id || g.slug;
          const title = g.title || id;
          const desc = g.description || '';
          const card = document.createElement('a');
          card.href =
            'gallery.html?c=' +
            encodeURIComponent(section.collection.id) +
            '&g=' +
            encodeURIComponent(id);
          card.className = 'gallery-card';
          card.innerHTML =
            '<span class="gallery-card-title">' + escapeHtml(title) + '</span>' +
            (desc ? '<span class="gallery-card-desc">' + escapeHtml(desc) + '</span>' : '');
          gridEl.appendChild(card);
        });
        sectionEl.appendChild(gridEl);
        listEl.appendChild(sectionEl);
      });
    })
    .catch(function () {
      showError('Unable to load galleries.');
    });
})();
