# Warmaster Revolution Papercraft

Image galleries hosted on **GitHub Pages**.

## View the site

After enabling GitHub Pages, the site will be at:

**https://lmaughan.github.io/warmaster-revolution-papercraft/**

The home page lists all galleries; each gallery is a separate page of related images.

---

## Testing locally

**Don’t** just open `index.html` in the browser. The site uses `fetch()` to load `galleries.json` and `gallery-*.json`; browsers block those requests from a `file://` URL, so the galleries won’t load.

Run a **local web server** from the project root, then open the URL it prints (usually `http://localhost:8000` or similar).

**Option 1 – Python (if installed):**

```bash
# Python 3
python -m http.server 8000
```

**Option 2 – Node (if you have npm):**

```bash
npx serve
```

Then open **http://localhost:8000** (or the port shown) in your browser. Use the same URL when opening a gallery page so the links and JSON paths work correctly.

---

## Adding 2 new galleries (each with several related images)

You can add as many galleries as you like. Here’s how to add **two new galleries**, each with several images.

### 1. Add your image files

Put all images in the `images/` folder. You can use subfolders if you like (e.g. `images/papercraft/`, `images/paints/`).

Example:

- `images/papercraft-build1.jpg`
- `images/papercraft-build2.jpg`
- `images/papercraft-group.jpg`
- `images/paint-scheme-a.jpg`
- `images/paint-scheme-b.jpg`
- `images/paint-detail.jpg`

### 2. Create a JSON file for each new gallery

Create one JSON file per gallery. The filename must be **`gallery-<id>.json`**, where `<id>` is a short slug (letters, numbers, hyphens) you’ll use in the next step.

**First gallery** – e.g. **Papercraft builds**  
Create `gallery-papercraft.json` (or any id like `gallery-mybuilds.json`):

```json
[
  { "src": "images/papercraft-build1.jpg", "caption": "Build 1 – front" },
  { "src": "images/papercraft-build2.jpg", "caption": "Build 2 – WIP" },
  { "src": "images/papercraft-group.jpg", "caption": "Group shot" }
]
```

**Second gallery** – e.g. **Paint jobs**  
Create `gallery-paints.json`:

```json
[
  { "src": "images/paint-scheme-a.jpg", "caption": "Scheme A – base" },
  { "src": "images/paint-scheme-b.jpg", "caption": "Scheme B – overview" },
  { "src": "images/paint-detail.jpg", "caption": "Detail – weathering" }
]
```

- Each entry can be `{ "src": "path/to/image.jpg", "caption": "Optional caption" }` or just a string: `"images/photo.jpg"`.
- Order in the array is the order images appear in the gallery.

### 3. Register each gallery on the home page

Edit **`galleries.json`** and add one object per gallery. Each needs an **`id`** that matches the filename (the part after `gallery-` and before `.json`), plus **`title`** and optional **`description`**:

```json
[
  {
    "id": "sample",
    "title": "Sample gallery",
    "description": "Default gallery"
  },
  {
    "id": "papercraft",
    "title": "Papercraft builds",
    "description": "Finished models and work-in-progress shots"
  },
  {
    "id": "paints",
    "title": "Paint jobs",
    "description": "Paint schemes and detail work"
  }
]
```

- **`id`** must match the filename: `gallery-papercraft.json` → `"id": "papercraft"`.
- **`title`** is shown on the home page and as the gallery page heading.
- **`description`** is shown under the title on the home page and at the top of the gallery page.

### 4. Commit and push

After adding the JSON files, image files, and updating `galleries.json`, commit and push. GitHub Pages will update automatically. Your two new galleries will appear on the home page and open at:

- `gallery.html?g=papercraft`
- `gallery.html?g=paints`

---

## Summary checklist for 2 new galleries

| Step | What to do |
|------|------------|
| 1 | Add image files under `images/` (or subfolders). |
| 2 | Create `gallery-<id1>.json` with an array of `{ "src": "...", "caption": "..." }` for the first gallery’s images. |
| 3 | Create `gallery-<id2>.json` for the second gallery’s images. |
| 4 | In `galleries.json`, add two entries with `"id": "<id1>"` and `"id": "<id2>"` (matching the filenames), plus `title` and optional `description`. |
| 5 | Commit and push. |

---

## Enabling GitHub Pages

1. Open the repo on GitHub: **https://github.com/lmaughan/warmaster-revolution-papercraft**
2. Go to **Settings** → **Pages** (under “Code and automation”).
3. Under **Build and deployment** → **Source**, choose **Deploy from a branch**.
4. Under **Branch**, select **main** and **/ (root)**.
5. Click **Save**.

The site will be published from the root of the repo.

---

## Project structure

| File / folder | Purpose |
|---------------|--------|
| `index.html` | Home page: lists all galleries (from `galleries.json`). |
| `gallery.html` | Single gallery viewer; which gallery is set by `?g=<id>`. |
| `galleries.json` | List of galleries (id, title, description) shown on the home page. |
| `gallery-<id>.json` | For each gallery: array of image entries (src, optional caption). |
| `gallery.json` | Default gallery when opening `gallery.html` with no `?g=` (optional). |
| `index.js` | Loads `galleries.json` and builds the home page links. |
| `gallery.js` | Loads the right `gallery-<id>.json` and renders the grid + lightbox. |
| `styles.css` | Shared layout and theme. |
| `images/` | Your image files. |
| `.nojekyll` | Tells GitHub Pages to serve the site as static files (no Jekyll). |
