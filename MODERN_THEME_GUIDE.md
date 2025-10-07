# 🎹 Modern Black & White Piano Theme - Design Guide

## Overview
Your e-commerce site has been completely transformed with a modern, minimalist black and white piano aesthetic. This theme emphasizes high contrast, clean lines, sharp edges, and sophisticated typography.

---

## 🎨 Color Palette

### Primary Colors
```scss
Pure Black:        #000000  // Primary accent, text, buttons
Almost Black:      #1a1a1a  // Body text for better readability
Pure White:        #ffffff  // Backgrounds, contrast text
Off-White:         #fafafa  // Card backgrounds, subtle surfaces
```

### Secondary Colors
```scss
Light Gray:        #f5f5f5  // Hover backgrounds, subtle highlights
Border Gray:       #e0e0e0  // Borders, dividers
Medium Gray:       #666666  // Secondary text
Muted Gray:        #999999  // Tertiary text, placeholders
Dark Surface:      #0a0a0a  // Dark mode surfaces
```

### Color Usage Philosophy
- **High Contrast:** Pure black on pure white for maximum impact
- **No Gradients:** Except for hero overlays (black gradients only)
- **Grayscale Images:** Product images start grayscale, color on hover
- **Sharp Transitions:** No soft transitions between colors

---

## 📐 Design Principles

### 1. **Zero Border Radius**
All elements use `border-radius: 0` for sharp, architectural edges:
- Buttons
- Cards
- Inputs
- Images (except profile pictures)
- Modals and dropdowns

### 2. **Bold Typography**
```scss
Headings:
  - Font Weight: 600-700
  - Letter Spacing: -0.02em to -0.03em (tight)
  - Line Height: 1.1-1.2

Body Text:
  - Font Weight: 400
  - Letter Spacing: Normal
  - Line Height: 1.6-1.8

Buttons & Labels:
  - Font Weight: 500-700
  - Letter Spacing: 0.05em-0.1em (wide)
  - Text Transform: UPPERCASE
  - Font Size: 0.875rem
```

### 3. **Minimal Shadows**
- Default cards: `0 1px 3px rgba(0, 0, 0, 0.08)`
- Hover state: `0 8px 24px rgba(0, 0, 0, 0.12)`
- Hero elements: `0 12px 32px rgba(0, 0, 0, 0.15)`

### 4. **2px Borders**
All borders are solid, never dashed or dotted:
- Default: `1px solid #e0e0e0`
- Hover/Active: `2px solid #000`
- Primary buttons: `2px solid #000`

---

## 🎯 Component Styling

### Buttons

#### Primary Button (Black)
```scss
background: #000;
color: #fff;
border: 2px solid #000;
padding: 0.875rem 2rem;
text-transform: uppercase;
letter-spacing: 0.05em;
font-weight: 600;
border-radius: 0;

&:hover {
  background: #fff;
  color: #000;
}
```

#### Secondary Button (Outline)
```scss
background: transparent;
color: #000;
border: 2px solid #000;

&:hover {
  background: #000;
  color: #fff;
}
```

### Cards

#### Standard Card
```scss
background: #fff;
border: 1px solid #e0e0e0;
border-radius: 0;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
transition: all 0.3s ease;

&:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  border-color: #000;
  transform: translateY(-4px);
}
```

### Images

#### Product Images
```scss
filter: grayscale(100%);
transition: all 0.5s ease;

&:hover {
  filter: grayscale(0%);
  transform: scale(1.05);
}
```

### Forms

#### Input Fields
```scss
border: 1px solid #e0e0e0;
border-radius: 0;
padding: 0.75rem 1rem;

&:focus {
  border-color: #000;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
  outline: none;
}
```

---

## 📱 Page-Specific Designs

### Home Page (`home.component.scss`)

#### Hero Section
- **Background:** Black gradient (135deg, #000 to #1a1a1a)
- **Pattern Overlay:** Subtle geometric pattern in white (2% opacity)
- **Text:** Pure white
- **Buttons:** White primary, transparent outline

#### Product Showcase
- **Cards:** White with black borders
- **Badge:** Black with white text (top-right)
- **Hover:** Shadow lifts, border darkens, grayscale removed

#### Floating Actions
- **Style:** White squares with black borders
- **Icons:** Black, turn white on hover
- **Hover:** Background turns black, scales up 10%

### About Page (`about.component.scss`)

#### Hero
- **Overlay:** Dark gradient (75-85% black opacity)
- **Typography:** Lighter weight for subtitle (300)
- **Buttons:** Black on white background, inverse on hover

#### Feature Cards
- **Background:** White on light gray (#fafafa)
- **Icons:** Black, 2rem size
- **Hover:** Lifts up, border turns black

#### Team Section
- **Cards:** Light gray background
- **Images:** Grayscale with black border
- **Hover:** Card turns black, text turns white

#### CTA Section
- **Background:** Pure black
- **Text:** White
- **Buttons:** White primary, outline secondary

### Category Page (`category.component.scss`)

#### Header
- **Background:** Pure black
- **Text:** White
- **Typography:** Large, bold, uppercase

#### Filter Section
- **Background:** Light gray (#fafafa)
- **Borders:** Light gray, turns black on hover
- **Labels:** Uppercase, bold, letter-spaced

#### Product Grid
- **Layout:** Auto-fill grid, min 280px
- **Gap:** 2rem
- **Cards:** Standard card style with grayscale images

#### Product Actions (Hover)
- **Position:** Top-right
- **Style:** White buttons with black borders
- **Animation:** Fade in from right on hover

### Product Details Page (`product-details.component.scss`)

#### Gallery
- **Main Image:** 600px height, full-width
- **Thumbnails:** 4-column grid
- **Active:** 3px black border
- **Hover:** Scale up effect

#### Info Section
- **Typography:** 2.5rem title, tight letter-spacing
- **Price:** 2.5rem bold black
- **Borders:** 1px dividers between sections

#### Options
- **Style:** Square buttons with borders
- **Active:** Black background, white text
- **Hover:** Border darkens

#### Add to Cart
- **Full-width button:** Black with icon
- **Wishlist:** Square icon button beside it

### Rendezvous/Contact Page (`rendezvous.component.scss`)

#### Form Wrapper
- **Background:** White
- **Border:** Light gray, turns black on hover
- **Shadow:** Minimal, increases on hover

#### Calendar
- **Container:** White with black accents
- **Header:** Black bottom border (2px)
- **Day Names:** Uppercase, bold, letter-spaced
- **Selected Day:** Black background, white text
- **Today:** Black border outline

---

## 🎭 Interactive States

### Hover Effects
All hover effects follow these principles:
1. **Transform:** `translateY(-4px)` for cards
2. **Shadow:** Increases from 0.08 to 0.12 opacity
3. **Border:** Changes from #e0e0e0 to #000
4. **Transition:** `all 0.3s ease`

### Focus States
Form elements receive:
1. **Border:** Changes to #000
2. **Box Shadow:** `0 0 0 3px rgba(0, 0, 0, 0.1)`
3. **Outline:** None (removed)

### Active States
- **Buttons:** Instant color inversion
- **Options:** Black background, white text
- **Links:** Opacity reduces to 0.7

---

## 📐 Spacing System

### Padding Scale
```scss
Small:   0.75rem  (12px)
Medium:  1rem     (16px)
Large:   1.5rem   (24px)
XLarge:  2rem     (32px)
Section: 4rem     (64px)
```

### Gap/Margin Scale
```scss
Tight:   0.5rem   (8px)
Normal:  1rem     (16px)
Loose:   1.5rem   (24px)
Wide:    2rem     (32px)
```

---

## 🔤 Typography Scale

### Font Sizes
```scss
Hero Title:        3.5rem   (56px)
Page Title:        2.5rem   (40px)
Section Title:     2rem     (32px)
Card Title:        1.25rem  (20px)
Body:              1rem     (16px)
Small:             0.875rem (14px)
Tiny:              0.75rem  (12px)
```

### Font Weights
```scss
Light:    300
Regular:  400
Medium:   500
Semibold: 600
Bold:     700
```

---

## 🎬 Animations

### Fade In
```scss
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Standard Transitions
All transitions use: `all 0.3s ease`

Special cases:
- Image transforms: `0.5s ease`
- Micro-interactions: `0.2s ease`

---

## 📋 Component Checklist

### ✅ Completed Components
- [x] Main color system (main.css)
- [x] Global styles (styles.scss)
- [x] Home component
- [x] About component
- [x] Category component
- [x] Product Details component
- [x] Rendezvous/Contact component

### 🎨 Design Elements
- [x] Black & white color palette
- [x] Zero border radius
- [x] Grayscale image filters
- [x] 2px borders
- [x] Uppercase labels
- [x] Minimal shadows
- [x] High contrast
- [x] Sharp hover effects

---

## 🚀 Implementation Notes

### CSS Variables in Use
```css
--background-color: #ffffff
--default-color: #1a1a1a
--heading-color: #000000
--accent-color: #000000
--surface-color: #fafafa
--contrast-color: #ffffff
--border-color: #e0e0e0
--hover-bg: #f8f8f8
```

### Key Features
1. **Consistency:** All components follow the same design language
2. **Accessibility:** High contrast ratios (AAA rated)
3. **Performance:** Optimized transitions and animations
4. **Responsive:** Mobile-first approach maintained
5. **Modern:** Uses latest CSS features (color-mix, grid, flexbox)

---

## 🎯 Design Philosophy

> "Less is more. Black and white. High contrast. Sharp edges. Bold typography. Let the products speak."

This theme embodies:
- **Minimalism:** Remove all unnecessary elements
- **Clarity:** High contrast for easy scanning
- **Professionalism:** Clean, architectural aesthetic
- **Modernity:** Contemporary design trends
- **Timelessness:** Won't feel dated quickly

---

## 📸 Visual Hierarchy

### Level 1: Primary Actions
- Black buttons with white text
- Large, bold typography
- High contrast elements

### Level 2: Content
- Almost-black text (#1a1a1a)
- Product images with grayscale filter
- White/light gray backgrounds

### Level 3: Secondary Info
- Gray text (#666, #999)
- Lighter borders (#e0e0e0)
- Subtle shadows

---

## 🔧 Customization Tips

### To Make It Warmer
Replace pure white (#fff) with cream (#fefefe or #fafaf8)

### To Make It Softer
Use 2-4px border radius instead of 0
Reduce border width from 2px to 1px

### To Add Color
Keep black/white, add one accent color for CTAs
Example: Electric blue, vibrant red, or forest green

---

## ✨ Special Effects

### Image Grayscale Toggle
All product images start grayscale and reveal color on hover:
```scss
filter: grayscale(100%);
transition: filter 0.5s ease;

&:hover {
  filter: grayscale(0%);
}
```

### Card Lift Effect
Cards lift up and add shadow on hover:
```scss
transform: translateY(0);
transition: all 0.3s ease;

&:hover {
  transform: translateY(-4px);
}
```

### Border Color Transition
Borders change from light to black on hover:
```scss
border: 1px solid #e0e0e0;
transition: border-color 0.3s ease;

&:hover {
  border-color: #000;
}
```

---

## 📱 Responsive Breakpoints

```scss
Mobile:     max-width: 576px
Tablet:     max-width: 768px
Desktop:    max-width: 992px
Large:      max-width: 1200px
XL:         min-width: 1200px
```

All components are fully responsive with mobile-first approach.

---

**Theme Version:** 1.0  
**Last Updated:** October 7, 2025  
**Design System:** Modern Black & White Piano  
**Framework:** Angular + SCSS
