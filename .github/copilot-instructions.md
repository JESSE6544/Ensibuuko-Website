# Ensibuuko Website — AI Agent Instructions

## Project Overview
Static website for Ensibuuko, a fintech company providing digital financial solutions (MOBIS, Chomoka, lending services) for SACCOs, VSLAs, and MFIs in Africa. Architecture: pure HTML/CSS/vanilla JS with no build tools, frameworks, or external dependencies.

## Architecture & File Structure

### Page Structure (3 entry points)
- **`home.html`** – Landing page with hero, product overview, testimonials, team, newsletter signup
- **`products_page.html`** – Product showcase (Chomoka, MOBIS, Lending) with detailed cards and comparison
- **`about_page.html`** – Mission, vision, metrics, partner logos, approach cards
- **`contact.html`** – Referenced but not yet created; follow home.html nav link pattern

### Asset Organization
- **`assets/images/`** – All images (logo, product mockups, backgrounds, team photos)
  - Logo: `LOGO EDITS v2-01.png` (45px in nav, 60px in footer)
  - Hero/section backgrounds: `00023.jpg`, `00012.jpg`, `team.png`
  - Product mockups: `Chomoka-phone.png`, `Mobis.png`

## Design System & Patterns

### CSS Custom Properties (`:root` in every page)
```css
--navy: #0A1A3A        /* Headers, footers, primary backgrounds */
--accent: #00D4AA      /* Primary CTA buttons ("Learn More" buttons) */
--accent-2: #10B981    /* Product headings, secondary accents */
--bg: #C8F9DE or #C6F8D8  /* Page background (varies slightly per page) */
--muted: #F8FAFC       /* Card backgrounds and light backgrounds */
--text: #0B1220        /* Primary text color */
--max-width: 1200px    /* Container max-width */
```

### Card & Component Patterns
**Product Cards** (`products_page.html`):
- Flexbox layout: text on left, image on right (reversed for MOBIS)
- Responsive: `flex-direction:column` on `max-width:768px`
- Image max-width: 300px with `object-fit:contain`
- Include `onerror="this.style.display='none'"` for image fallback
- Spacing between cards: `<div style="height:2rem;"></div>`

**Hero Section**:
- 50vh minimum height with background image overlay (dark semi-transparent `::before`)
- Fade-in animation on child elements (`@keyframes fadeInHero`)
- Text centered and positioned relative to overlay

**Grid Layouts**:
- Metrics/cards: `grid-template-columns:repeat(auto-fit,minmax(220px,1fr))`
- Team/approach: `repeat(3,1fr)` → `repeat(2,1fr)` on mobile
- Footer: `repeat(4,1fr)` on desktop

### Typography & Spacing
- Font: Inter (300, 400, 600, 700, 800 weights from Google Fonts)
- Headings: `font-weight:800` with generous margins
- Body text: 1.6 line-height; muted text color `#475569`
- Buttons: `padding:0.55rem 0.9rem` (smaller) to `padding:2rem` (hero-scale)
- Section margins: `4rem auto`; page padding: `1rem`

## Key Patterns & Conventions

### Image Handling
- **Logo responsive sizing**: width attr in HTML (45px nav, 60px footer)
- **Fallback mechanism**: All product images use `onerror="this.style.display:'none'"`
- **Background images**: Use CSS `background:url('assets/images/...') center/cover no-repeat`
- **Grayscale on hover**: Partner logos use `filter:grayscale(100%);opacity:0.9` → `filter:none;opacity:1`

### Navigation
- All pages: sticky header with navy background, white links
- Logo + brand name on left; nav links (Home, Products, About, Contact) on right
- Links reference: `index.html` (home), `products_page.html`, `about_page.html`, `contact.html`
- Mobile nav: converts to `flex-direction:column;gap:1rem`

### Responsive Breakpoint
- **768px breakpoint**: Only one defined in codebase
- Product cards stack vertically
- Hero text scales down (h1: 2rem, p: 1rem)
- Grids collapse to single column (where applicable)
- No mobile-first approach; desktop-first with max-width media queries

### Interactive Elements
- **Buttons**: Use `.btn` + `.primary` class; styled with accent color
- **Scroll animations**: Elements with `.reveal` class fade in on scroll (home.html)
- **Navbar hide on scroll** (home.html only): `header.style.transform:'translateY(-100%)'` on scroll down
- **Newsletter form**: Flexbox row with input + submit button
- **Click handlers**: Inline `onclick="window.location.href='contact.html'"` for navigation

## Critical Developer Notes

### No Build Process
- Static HTML/CSS/JS; open files directly in browser
- No minification, bundling, or compilation step
- Changes are immediately visible; refresh browser to see updates

### Styling Approach
- **Inline styles heavily used** for one-offs (e.g., `style="max-width:200px;opacity:0.4;"`)
- **Embedded `<style>` tags** in `<head>` of each page (NOT external stylesheet)
- **Each page is self-contained**; duplicate styles across files (home.html, products_page.html, about_page.html)
- If updating design system, update `:root` variables AND all related rules across all three pages

### Common Patterns for New Pages
1. Copy header/nav structure from existing pages
2. Define `:root` CSS vars (maintain consistency with other pages)
3. Include responsive media query at end of `<style>`
4. Use `.container` or `.section` for max-width centering
5. Import Inter font in `<head>`
6. Add footer with navy background and copyright

### Image Path References
- All relative: `assets/images/filename.png`
- Paths assume HTML files are in root directory
- Test image loading by opening file in browser or checking browser DevTools

### Known Issues/Patterns to Preserve
- Product card images alternate left/right (Chomoka left, MOBIS right, Lending left)
- Spacing between product cards uses empty divs: `<div style="height:2rem;"></div>` (not margins)
- Hero sections apply overlay via pseudo-element to darken background images
- No framework-specific class patterns (no BEM, no Tailwind)

## When Adding Features
- **New CTA button?** Use `class="btn primary"` styling
- **New section with background image?** Use `.pattern-bar` pattern from home.html
- **New product/card?** Copy `.product-card` structure; test responsive layout at 768px
- **New page?** Create `pagename.html`; link in all page navs; match design system
- **Mobile check?** Test at 768px breakpoint; ensure flex/grid reflows properly

## Questions to Ask Yourself
- Is the image path relative to root HTML location?
- Does the new element scale properly under 768px width?
- Is the color from the `:root` vars or hardcoded in `<style>`?
- Are animations smooth (no janky transitions)?
- Does the layout work without the image (`onerror` fallback)?
