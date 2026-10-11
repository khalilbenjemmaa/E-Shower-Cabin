# AGENTS.md

Guide for AI coding agents (and humans) working on this repo.

## What this is

**Sweet Lodge** — a French-language showcase / catalog site for a shower-cabin (cabine de douche) installer in Sfax, Tunisia. Customers browse cabins and ask for a price on **WhatsApp**; there is no backend, no real payments, and prices are never shown in the UI ("Prix sur demande WhatsApp").

- Angular **17.3** SPA, standalone components, no NgModules. (The README's "Angular CLI 20.2.2" line is wrong.)
- Angular project name is `bain-et-cuisine` (legacy name, used in `angular.json` and the `dist/` path).
- Visual base is the BootstrapMade **NiceShop** e-commerce template (Bootstrap 5 + vendor JS), adapted into Angular.
- All user-facing text is **French**. Keep it that way.

## Commands

Run from this directory (`E-Shower-Cabin/`). Node 20 locally, Node 18 in CI.

| Task | Command |
|---|---|
| Install | `npm ci` |
| Dev server (http://localhost:4200) | `npm start` |
| Production build → `dist/bain-et-cuisine/browser` (+ `postbuild`: 404.html, sitemap.xml) | `npm run build` |
| Client demo build for GitHub Pages (base-href `/E-Shower-Cabin/`, robots.txt blocks crawlers) | `npm run predeploy` |
| Unit tests | `npm test` — **currently broken**, see Known issues |

`npm run build` is the main verification step: it should complete with only the known style-budget warning (contact component SCSS just over 10 kB). A new budget **error** (> 20 kB per component stylesheet) fails the build.

## Deployment — pushing to `main` deploys to production

`.github/workflows/deploy.yml` runs on every push to `main`: `npm ci` → `npm run predeploy` → publishes `dist/bain-et-cuisine/browser` to the `gh-pages` branch. That GitHub Pages site is **only a client demo**; the real site is `https://sweetlodge.com.tn` (`sweetlodge.tn` should redirect to it), hosted elsewhere and built with `npm run build` (base-href `/`). Don't push to `main` unless you mean to ship. There is also a manual `npm run deploy` (angular-cli-ghpages) — prefer the workflow.

`scripts/postbuild.mjs` runs after every build: it copies `index.html` to `404.html` (SPA fallback for static hosts), writes `sitemap.xml` from the catalog in `product.service.ts`, and with `--demo` writes a `Disallow: /` robots.txt. The production host must rewrite unknown paths to `index.html` (or serve `404.html`), otherwise deep links like `/product/7` 404.

## Layout

```
src/
  index.html, main.ts, styles.scss     # styles.scss = global button/card/form overrides
  app/
    app.component.*        # Shell: header, search, nav, cart offcanvas, footer, <router-outlet>
    app.config.ts          # Router (clean URLs) + scroll restoration + SeoTitleStrategy
    app.routes.ts          # All routes (eager, no lazy loading)
    services/
      product.service.ts   # The ENTIRE product catalog (hardcoded) + grouping/search helpers
      cart.service.ts      # Cart in localStorage, BehaviorSubject-based
      seo.service.ts       # Canonical/og:url/description per route, SITE_URL, SeoTitleStrategy
    shared/
      plan-icon/           # SVG "top view" diagram of a cabin layout
      reveal.directive.ts  # appReveal: fade-in on scroll (styles in styles.scss)
      product-media.ts     # responsiveImage() srcset helper, WhatsApp link builders
    home/                  # Page shell + marquee, why-us, consultation, newsletter
      sections/            # hero, category-explorer, product-carousel, shop-the-look, social-proof
    category/ product-details/ cart/ checkout/ about/ contact/ rendezvous/
  assets/
    css/main.css           # NiceShop template CSS (~12.8k lines, global)
    js/main.js             # NiceShop template JS, wrapped in initMainScript()
    vendor/                # bootstrap, bootstrap-icons, swiper, aos, glightbox, drift-zoom, purecounter
    img/product/           # Product photos (N.webp) + 480/ and 960/ WebP variants for srcset
    img/hero/              # Home hero image (800w / 1600w)
public/                    # Copied to the site root: favicon, icons, og-image.jpg, robots.txt, site.webmanifest
```

## Routes

| Path | Component | Notes |
|---|---|---|
| `''` | Home | Hero uses first product, "best sellers" = first 3 |
| `category` | Category | Lists types |
| `category/:categoryName` | Category | `categoryName` is a **type slug**; shows subtypes, or products if only one subtype |
| `category/:categoryName/:subType` | Category | `subType` slug, or the sentinel `all` for every product of the type |
| `product/:id` | ProductDetails | WhatsApp "ask for price" button |
| `about`, `rendezvous`, `contact`, `checkout` | — | |
| `**` | redirect to `''` | |

Routing uses **clean URLs** (`/product/7`). Old hash links (`/#/product/7`) are rewritten in `main.ts` before bootstrap. Each route sets `title` and `data.description`; `SeoService` applies them and updates the canonical URL. The product page sets its own title/description once loaded.

## Product catalog (`services/product.service.ts`)

The catalog is a hardcoded array; editing products means editing this file. Fields that matter:

- `type` + `subType` — **drive category navigation.** They're slugified with `ProductService.slugify` (lowercase, spaces → `-`) to build `/category/:type/:subType`.
- `typeOrder` — the list of types shown in the category screens, in order. **A product whose `type` is not in `typeOrder` is hidden from category browsing** (still reachable by search and `/product/:id`). Product 36 (`type: "walk-in"`) is currently hidden this way.
- `category` — free text shown in search results and cart, and used by search. It is *not* used for navigation and is inconsistent with `type` on some products (casing, trailing space on id 30).
- `price` — stored but intentionally never displayed.
- `image` — `assets/img/product/N.webp`. When adding a photo, also create the `480/` and `960/` variants (`cwebp -q 76 -resize 480 0 N.webp -o 480/N.webp`, same with 960), which `responsiveImage()` expects. The file number does **not** always equal the product id (e.g. id 26 → `27.webp`), and ids have gaps.
- `plan` — not set in the array; filled in the constructor from `planMap` (id → `PlanType`). When adding a product, add it to `planMap` too, or it gets no plan icon.

`PlanType` is defined twice — in `product.service.ts` and `shared/plan-icon/plan-icon.component.ts`. Keep both unions identical. `walk-in-left` and `walk-in-right` currently draw the same icon.

Domain vocabulary: *coulissante* = sliding, *battante* = hinged, *paroi fixe* = fixed panel, *walk-in*, *en niche* = between three walls, *en ongle* = corner install (the data says "ongle"; it's the client's wording, likely meant "angle" — ask before changing visible text).

## Conventions

- Standalone components with explicit `imports: [...]`; constructor injection; `templateUrl` + `.scss` per component (`style: scss` schematic).
- Templates use `*ngIf` / `*ngFor` / `[ngClass]`, not the new `@if`/`@for` control flow. Match the existing style.
- Services expose data as `Observable` via `of(...)` even though everything is synchronous — keep that shape so a real API can be swapped in later.
- TypeScript is `strict` with `strictTemplates`. Single quotes, 2-space indent (`.editorconfig`).
- Many files start with a `// bain-et-cuisine/src/app/...` path comment; fine to keep, not required.
- Brand colors: dark green `#043920`, dark teal `#11262B`. Global button styles in `styles.scss` use `!important` to beat the template CSS — you'll often need the same.
- Contact info is repeated in several templates and TS files (phone `+216 99 809 804` / WhatsApp `21699809804`, email `Sweetlodge.mba@gmail.com`, address Route Gremda km9, Sfax). Update all occurrences together (`grep -rn 21699809804 src`).

## Legacy template JS — gotchas

- Vendor scripts and `assets/js/main.js` are loaded globally via `angular.json` `scripts`, not imported.
- `main.js` defines `initMainScript()`, called **once** from `AppComponent.ngAfterViewInit`. Its DOM wiring (mobile nav toggle, scroll-top, AOS, Swiper, Drift zoom, template checkout/cart handlers) only binds to elements present at that moment. Elements that appear later via routing don't get re-initialized. Prefer Angular code for new behaviour over adding to `main.js`.
- `data-aos` attributes rely on AOS from `main.js`.
- Bootstrap JS is used directly via `data-bs-*` attributes (e.g. the cart offcanvas `#cartOffcanvas`).
- `src/assets/css/main.css` is the template's global stylesheet; component SCSS overrides it. Avoid editing `main.css` unless a global change is really intended.

## Features that are stubs

- **Cart / checkout**: works in `localStorage` (key `sweetlodge_cart_v1`, `taxRate` 0.19), but checkout only `console.log`s and `alert`s. Cart header button only appears when the cart isn't empty; "add to cart" exists only on category product cards.
- **Contact form**: `console.log` + `alert`, nothing sent.
- **Rendez-vous form**: static `php-email-form` with `action="#"` — non-functional.
- **Newsletter** (home): no backend, submitting opens a pre-filled e-mail to Sweetlodge.mba@gmail.com.
- **Reviews** (home, `social-proof.component.ts`): `reviews` is empty, so the row is hidden. Only add genuine reviews.
- WhatsApp "ask for price" is the real conversion path (`shared/product-media.ts` on the home page; `ProductDetailsComponent.getWhatsAppLink` has its own copy).

## Known issues (as of Oct 2026)

- `npm test` fails: `@angular/platform-browser-dynamic` isn't a dependency. `src/app/app.spec.ts` also expects an `<h1>` the shell doesn't render. Fixing tests needs `npm i -D @angular/platform-browser-dynamic@~17.3.0` and an updated spec.

## Working agreements for agents

- Run `npm run build` after changes and make sure it passes with no new errors.
- Keep UI text in French; keep prices hidden unless the owner asks otherwise.
- Marketing copy must be true: no invented reviews, counters, promotions or service claims. Confirmed claims: sur mesure, installation par nos équipes, garantie pièces & main d'œuvre, livraison gratuite.
- Home colors use only the theme tokens (`--accent-color`, `--default-color`, `--surface-color`, …) and `color-mix` tints of them.
- Don't commit `dist/`, `.angular/cache`, or `.DS_Store` files.
- Don't push to `main` without explicit approval (it deploys).
