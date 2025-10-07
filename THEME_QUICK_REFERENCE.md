# 🎹 Modern Black & White Piano Theme - Quick Reference

## Color Palette
```scss
// Primary
#000000  // Pure Black - Buttons, headings, accents
#1a1a1a  // Almost Black - Body text
#ffffff  // Pure White - Backgrounds, contrast text

// Surfaces
#fafafa  // Off-White - Card backgrounds
#f5f5f5  // Light Gray - Hover states

// Borders & Dividers
#e0e0e0  // Light border
#000000  // Active/hover border

// Text Hierarchy
#000000  // Headings
#1a1a1a  // Body text
#666666  // Secondary text
#999999  // Tertiary text
```

## Button Styles

### Primary (Black)
```scss
background: #000;
color: #fff;
border: 2px solid #000;
// Hover: Inverts colors
```

### Secondary (Outline)
```scss
background: transparent;
color: #000;
border: 2px solid #000;
// Hover: Fills black
```

## Typography

### Sizes
- Hero: 3.5rem
- Page Title: 2.5rem
- Section: 2rem
- Card: 1.25rem
- Body: 1rem
- Small: 0.875rem

### Weights
- Light: 300 (subtitles)
- Regular: 400 (body)
- Medium: 500 (buttons)
- Semibold: 600 (headings)
- Bold: 700 (emphasis)

### Letter Spacing
- Headings: -0.02em to -0.03em
- Labels: 0.05em to 0.1em (uppercase)

## Card Style
```scss
background: #fff;
border: 1px solid #e0e0e0;
border-radius: 0;
box-shadow: 0 1px 3px rgba(0,0,0,0.08);

&:hover {
  border-color: #000;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  transform: translateY(-4px);
}
```

## Image Effects
```scss
filter: grayscale(100%);

&:hover {
  filter: grayscale(0%);
  transform: scale(1.05);
}
```

## Form Controls
```scss
border: 1px solid #e0e0e0;
border-radius: 0;
padding: 0.75rem 1rem;

&:focus {
  border-color: #000;
  box-shadow: 0 0 0 3px rgba(0,0,0,0.1);
}
```

## Spacing
- Small: 0.75rem
- Medium: 1rem
- Large: 1.5rem
- XLarge: 2rem
- Section: 4rem

## Transitions
- Standard: `all 0.3s ease`
- Images: `all 0.5s ease`
- Micro: `all 0.2s ease`

## Key Design Rules
1. ❌ No border radius (use 0)
2. ✅ 2px borders for emphasis
3. ✅ Grayscale images by default
4. ✅ UPPERCASE for labels/buttons
5. ✅ High contrast everywhere
6. ✅ Minimal shadows
7. ✅ Sharp, clean edges
8. ✅ Black & white only

## Component Files Updated
- ✅ `src/styles.scss` - Global styles
- ✅ `src/app/home/home.component.scss`
- ✅ `src/app/about/about.component.scss`
- ✅ `src/app/category/category.component.scss`
- ✅ `src/app/product-details/product-details.component.scss`
- ✅ `src/app/rendezvous/rendezvous.component.scss`
- ✅ `src/assets/css/main.css` - Color variables

## Browser Support
- Modern browsers (ES6+)
- CSS Grid & Flexbox
- CSS Custom Properties
- CSS Transitions & Transforms
