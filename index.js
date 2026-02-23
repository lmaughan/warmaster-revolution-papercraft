(function () {
  const listEl = document.getElementById('galleries');
  const loadingEl = document.getElementById('loading');
  const errorEl = document.getElementById('error');

  function showError(msg) {
    loadingEl.hidden = true;
    errorEl.textContent = msg;
    errorEl.hidden = false;
  }

  fetch('galleries.json')
    .then(function (res) {
      if (!res.ok) throw new Error('Unable to load galleries.');
      return res.json();
    })
    .then(function (galleries) {
      loadingEl.hidden = true;
      if (!galleries.length) {
        showError('No galleries available.');
        return;
      }
      galleries.forEach(function (g) {
        const id = g.id || g.slug;
        const title = g.title || id;
        const desc = g.description || '';
        const card = document.createElement('a');
        card.href = 'gallery.html?g=' + encodeURIComponent(id);
        card.className = 'gallery-card';
        card.innerHTML =
          '<span class="gallery-card-title">' + escapeHtml(title) + '</span>' +
          (desc ? '<span class="gallery-card-desc">' + escapeHtml(desc) + '</span>' : '');
        listEl.appendChild(card);
      });
    })
    .catch(function () {
      showError('Unable to load galleries.');
    });

  function escapeHtml(s) {
    const div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }
})();
