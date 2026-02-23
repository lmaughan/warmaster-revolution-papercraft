# Warmaster Revolution Papercraft

Papercraft miniature galleries for Warmaster Revolution factions.

**https://lmaughan.github.io/warmaster-revolution-papercraft/**

---

## Adding a new gallery

1. Create a subfolder under `images/` with your image files (e.g. `images/my_faction/`).
2. Create `gallery-<id>.json` listing each image:

```json
[
  { "src": "images/my_faction/cavalry_1.png", "caption": "Cavalry 1" },
  { "src": "images/my_faction/infantry_1.png", "caption": "Infantry 1" }
]
```

3. Add an entry to `galleries.json` with a matching `id`:

```json
{ "id": "my-faction", "title": "My Faction", "description": "Papercraft miniatures for My Faction" }
```

4. Commit and push. GitHub Pages deploys automatically.

## Testing locally

The site uses `fetch()` to load JSON, so opening `index.html` directly from the filesystem won't work. Run a local server instead:

```bash
python -m http.server 8000
```

or

```bash
npx serve
```

Then open **http://localhost:8000**.

## Project structure

| Path | Purpose |
|------|---------|
| `index.html` | Home page listing all galleries |
| `gallery.html` | Gallery viewer (`?g=<id>` selects the gallery) |
| `galleries.json` | Registry of galleries (id, title, description) |
| `gallery-<id>.json` | Image list for a single gallery |
| `index.js` | Builds the home page from `galleries.json` |
| `gallery.js` | Renders the image grid and lightbox |
| `styles.css` | Shared styles |
| `images/` | Image files, organised by faction |
| `.nojekyll` | Disables Jekyll processing on GitHub Pages |
