# Coloft - Rising Together

A simple, mobile-first static website for Coloft, a collective dedicated to somatic practices, breathwork, and relational healing.

## About

Coloft brings together facilitators and participants interested in:
- Therapy groups
- Workshops on listening and consent
- Integration sessions before and after healing work

Our core values center around words that start with "co": collaboration, co-creation, connection, and community.

## Design Philosophy

- **Mobile-first**: Optimized for small screens, scales up beautifully
- **Simple & Clean**: Easy to adapt for flyers and print materials
- **Vanilla HTML/CSS**: No build process, no dependencies
- **Accessible**: Semantic HTML and readable color contrast

## Contact

For facilitating or participating opportunities: **events@coloft.org**

## GitHub Pages Deployment

This site is deployed using GitHub Pages. Here's how it works:

### Initial Setup

1. **Repository Settings**
   - Go to your repository on GitHub
   - Click on "Settings" → "Pages" (in the left sidebar)
   - Under "Source", select the branch you want to deploy (usually `main`)
   - Select the root folder (`/`) as the source
   - Click "Save"

2. **Wait for Deployment**
   - GitHub will automatically build and deploy your site
   - This usually takes 1-2 minutes
   - Once deployed, your site will be available at: `https://[username].github.io/coloft/`

### Making Updates

1. Edit the HTML or CSS files locally
2. Commit your changes:
   ```bash
   git add .
   git commit -m "Update site content"
   git push
   ```
3. GitHub Pages will automatically redeploy within a few minutes

### Custom Domain (Optional)

To use a custom domain like `coloft.org`:

1. In your repository settings → Pages → Custom domain
2. Enter your domain name
3. Add a CNAME record in your DNS settings pointing to `[username].github.io`
4. Wait for DNS propagation (can take up to 48 hours)

### Files Structure

```
coloft/
├── index.html       # Main HTML file
├── styles.css       # All styling
└── README.md        # This file
```

## Customization

### Colors

The color palette is defined in CSS variables in `styles.css`:

- Primary: `#6B9080` (sage green)
- Secondary: `#A4C3B2` (light sage)
- Accent: `#CCE3DE` (pale mint)
- Background: `#F6FFF8` (off-white)

### Logo

The logo is a simple SVG of three ascending circles representing "rising together". You can:
- Export it as PNG for flyers (screenshot or use browser dev tools)
- Modify the SVG directly in `index.html`
- Replace it with your own design

### Content

All content is in `index.html`. Edit the text directly - no build process needed!

## Creating Flyers

The site includes print-optimized CSS. To create a simple flyer:

1. Open the site in a browser
2. Use Print Preview (Cmd/Ctrl + P)
3. The print version shows just the logo and contact info
4. Save as PDF or print directly

For more elaborate flyers, you can:
- Screenshot the logo section
- Use the same color palette
- Include: Logo + "Rising Together" + events@coloft.org

## Browser Support

Works on all modern browsers and mobile devices:
- Safari (iOS/macOS)
- Chrome/Edge
- Firefox
- Mobile browsers

## License

Feel free to adapt and modify for your community needs.
