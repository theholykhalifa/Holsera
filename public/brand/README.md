# Brand assets folder — drop official Holsera logo files here

The site looks for logo files in this folder at build time, in this order of preference:

1. `logo-horizontal.svg` (or `.png`) — mark + wordmark lockup, used in the header/footer
2. `logo-mark.svg` (or `.png`) — the H mark alone
3. `logo-3d.svg` (or `.png`) — the 3D/glass version, used as a hero/decorative asset if present

Accepted extensions: `.svg`, `.png`, `.webp`. File names are case-sensitive on most
hosts, so keep them lowercase.

**Until files are added, the site automatically renders a built-in SVG approximation
of the H mark with the HOLSERA wordmark set in Montserrat.** No build errors if this
folder is empty.

Optional extras (used only if present):

- `favicon.png` (48x48+) — replaced into the head
- `og-image.png` (1200x630) — social sharing preview
