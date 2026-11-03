# trueNourisher

**A concept storefront for Ayurvedic wellness.**

trueNourisher is a static website prototype exploring how an Ayurvedic wellness brand could present products, ingredient context, and a calm online shopping experience. The design pairs a warm editorial style with visible evidence notes and clear disclosures.

**Live preview:** [truenourisher.vercel.app](https://truenourisher.vercel.app)

## What’s included

- Responsive storefront with product collection, category filters, and sorting
- Product and brand imagery
- Client-side shopping bag with quantity controls and subtotal
- Demo wellness questionnaire
- Sample batch verification interaction
- Ingredient and evidence section with external references
- Mobile navigation and motion effects that respect reduced-motion preferences

## Built with

- HTML
- CSS
- JavaScript

The site is static and uses browser-side interactions. It does not currently connect to a product database, inventory system, payment provider, or customer account service.

## Run locally

No build step is required. Clone the repository and open `index.html` in a browser. For a local web server, run:

```bash
python3 -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000).

## Prototype status

This is a website concept, not a live commerce or health service:

- Checkout is a demo; no payment is processed and orders are not submitted.
- Batch verification uses a sample ID in the page script; it is not connected to a live verification database.
- Product catalogue details, prices, stock, formulas, and product-specific claims are provisional.
- Wellness information is for educational purposes and is not medical advice.

Before using the site for real sales, connect trusted product, inventory, verification, and payment services, and publish final product specifications and compliant claims.

## Project files

- `index.html` — page structure and catalogue content
- `styles.css` — responsive visual design
- `script.js` — cart, filters, demo assessment, and sample verification interactions
- `assets/products/` — brand, display, and product images
