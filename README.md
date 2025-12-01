# Ensibuuko Website

Static website for Ensibuuko, a fintech company providing digital financial solutions (MOBIS, Chomoka, lending services) for SACCOs, VSLAs, and MFIs in Africa.

## Quick Start

1. Open any `.html` file in your browser (no build process required)
2. Changes are reflected immediately upon refresh
3. All assets are relative to the root directory

## Pages

- **`index.html`** – Landing page with hero, product showcase, testimonials, and newsletter signup
- **`products.html`** – Product details with clickable "Learn More" modals
- **`about.html`** – Mission, vision, metrics, and partner logos
- **`careers.html`** – Job listings, culture, benefits, and CTA
- **`contact.html`** – Contact information and form

## Image Optimization Status

✅ **All images now have `loading="lazy"` attribute**, enabling:
- Lazy loading: Images below the fold defer loading until needed
- Improved Core Web Vitals (LCP, CLS)
- Faster initial page load

### Image Inventory

**Product Images** (loading="lazy" + onerror fallback):
- `Chomoka-phone.png` – Chomoka product mockup
- `Mobis.png` – MOBIS product mockup
- Lending logo in product cards

**Logos**:
- Nav logo: 45px (all pages) – `loading="lazy"`
- Footer logo: 60px (all pages) – `loading="lazy"`
- Partner logos: 15 images (index.html) – `loading="lazy"`

### Performance Tips

1. **Image Format**: Consider converting PNG logos to WebP with PNG fallback for 25-35% smaller file sizes
2. **Image Compression**: Use tools like TinyPNG or ImageOptim to reduce PNG sizes
3. **Responsive Images**: Use `srcset` attribute for hi-DPI displays (e.g., `2x` versions)
4. **Caching Headers**: Configure server to cache images (max-age: 31536000)
5. **CDN**: Serve images from a CDN to reduce latency

### Current Optimizations Applied

- ✅ Lazy loading (`loading="lazy"`) on all images
- ✅ Object-fit for consistent image scaling
- ✅ Error fallbacks (`onerror="this.style.display='none'"`)
- ✅ Responsive grid and flex layouts
- ✅ CSS media queries for mobile (max-width: 768px)

## Design System

### CSS Variables (in each page's `<style>`)

```css
--navy: #0A1A3A        /* Headers, footers */
--accent: #00D4AA      /* Primary CTA buttons */
--accent-2: #10B981    /* Product headings */
--bg: #C8F9DE          /* Page background */
--muted: #F8FAFC       /* Card backgrounds */
--text: #0B1220        /* Primary text */
--max-width: 1200px    /* Container width */
```

### Responsive Breakpoint

- **Desktop**: Full layout
- **Mobile** (max-width: 768px): Stacked flex/grid layouts, scaled text, adjusted spacing

## Architecture

No build tools, frameworks, or external dependencies. Pure HTML/CSS/vanilla JavaScript.

**Structure**:
- HTML files in root
- CSS in `css/` folder
- JavaScript in `js/` folder
- Images in `assets/images/` folder

## Key Features

- **Product Modals**: Click "Learn More" on product cards to view details
- **Newsletter Signup**: Subscribe form with validation
- **Scroll Animations**: Elements fade in on scroll (home page)
- **Mobile Navigation**: Responsive hamburger menu on mobile devices
- **Team Section**: Dynamically generated from JavaScript data

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Proprietary — Ensibuuko
