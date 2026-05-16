# Warmaster Papercraft

Papercraft miniature galleries for Warmaster Revolution and Warmaster Naval Battles.

**https://lmaughan.github.io/warmaster-revolution-papercraft/**

---

## Adding a new gallery

Each collection lives in its own subfolder (`warmaster_revolution/`, `warmaster_naval/`, etc.).

1. Create a subfolder under `<collection>/images/` with your image files (e.g. `warmaster_revolution/images/my_faction/`).
2. Create `<collection>/gallery-<id>.json` listing each image (paths are relative to the collection folder):

```json
[
  { "src": "images/my_faction/cavalry_1.png", "caption": "Cavalry 1" },
  { "src": "images/my_faction/infantry_1.png", "caption": "Infantry 1" }
]
```

3. Add an entry to `<collection>/galleries.json` with a matching `id`:

```json
{ "id": "my-faction", "title": "My Faction", "description": "Papercraft miniatures for My Faction" }
```

4. Commit and push. GitHub Pages deploys automatically.

To add a new collection, create the subfolder with `galleries.json` and gallery configs, then register it in the root `collections.json`.

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
| `index.html` | Home page listing all collections and galleries |
| `gallery.html` | Gallery viewer (`?c=<collection>&g=<id>`) |
| `collections.json` | Registry of gallery collections |
| `<collection>/galleries.json` | Galleries in a collection (id, title, description) |
| `<collection>/gallery-<id>.json` | Image list for a single gallery |
| `<collection>/images/` | Image files, organised by faction |
| `index.js` | Builds the home page from `collections.json` |
| `gallery.js` | Renders the image grid and lightbox |
| `styles.css` | Shared styles |
| `.nojekyll` | Disables Jekyll processing on GitHub Pages |
