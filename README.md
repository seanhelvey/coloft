# Coloft - We Rise Together

A vibrant, mobile-first static website for Coloft, a **co**llective dedicated to somatic practices, breathwork, and relational healing.

## About Coloft

**We rise together** through intentional practices that bring us into deeper **co**nnection with ourselves and each other.

Coloft creates **co**zy, **co**mpassionate spaces for local facilitators and practitioners to lead:
- **Breathwork** sessions that connect mind and body
- **Community gatherings** building authentic relationships
- **Therapeutic integration** for processing healing experiences
- **Healing circles** focused on listening, consent, and support

### The "Co-" Theme

Our identity centers around words beginning with "**co**":
- **Co**llective - We are stronger together
- **Co**mmunity - Rising as one
- **Co**nnection - Deepening authentic bonds
- **Co**llaboration - Supporting each other's growth
- **Co**-creation - Building healing spaces together
- **Co**zy - Creating warm, welcoming environments
- **Co**mpassionate - Leading with empathy and care
- **Co**-conspirators - Partners in transformation

## Design Philosophy

- **Mobile-first**: Optimized for small screens, scales up beautifully to desktop
- **Vibrant & Welcoming**: Color palette inspired by yoga studios—comfortable yet energetic
- **Print-friendly**: Optimized callout design for flyers and materials for potential **co**-conspirators
- **Visual storytelling**: Icons representing breathwork, community, therapeutic integration, and healing
- **Vanilla HTML/CSS**: No build process, no dependencies—just clean, maintainable code
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

### Color Palette

The vibrant, yoga-studio-inspired palette is defined in CSS variables in [styles.css](styles.css):

- **Primary**: `#7B68B5` - Calming purple (grounding, spiritual connection)
- **Secondary**: `#E8926C` - Warm terracotta (community warmth, earthiness)
- **Accent**: `#F4B860` - Golden amber (energy, transformation)
- **Healing**: `#6BC9A6` - Fresh teal (renewal, breath, growth)
- **Background**: `#FFF9F0` - Warm cream (comfort, openness)
- **Text Dark**: `#2D3047` - Deep slate
- **Text Light**: `#5C5E7A` - Soft gray

These colors work together to create a **co**mfortable yet vibrant atmosphere that reflects the energy of somatic practices.

### Logo & Icons

**Logo**: Three ascending circles in purple, terracotta, and amber representing "**we rise together**"

**Practice Icons**: Custom SVG icons throughout the site:
- 🫁 **Breathwork**: Flowing waves symbolizing breath
- 👥 **Community**: Connected circles representing relationships
- 🌊 **Therapeutic Integration**: Embracing waves and circles for processing
- 🌸 **Healing**: Blooming flower/heart shape for growth

All SVGs are inline in [index.html](index.html) for easy customization and perfect print reproduction.

### Content

All content is in [index.html](index.html). Edit the text directly—no build process needed!

## Creating Print Materials for Co-Conspirators

The site includes print-optimized CSS perfect for creating flyers and callouts for potential **co**-conspirators:

### Quick Print Method
1. Open the site in a browser
2. Use Print Preview (Cmd/Ctrl + P)
3. The print version shows just the logo, tagline, and contact info
4. Save as PDF or print directly

### Custom Flyer Tips
- Screenshot sections with the practice icons
- Use the vibrant color palette for visual consistency
- Key elements to include:
  - Logo (three ascending circles)
  - "Coloft—We Rise Together"
  - Practice icons (breathwork, community, integration, healing)
  - Contact: events@coloft.org
  - Emphasize the **co**- theme

## Browser Support

Works on all modern browsers and mobile devices:
- Safari (iOS/macOS)
- Chrome/Edge
- Firefox
- Mobile browsers

## License

Feel free to adapt and modify for your community needs.
