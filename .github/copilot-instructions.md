# Kimbo Campers Website - AI Agent Instructions

## Project Overview
Interactive 3D camper configurator website redesign for Kimbo Campers, allowing customers to visualize and customize truck-mounted campers in real-time with pricing calculations.

**Current Website**: https://www.kimboliving.com/ (Wix-based, static content)  
**Tech Stack**: HTML5, CSS3, Bootstrap 5 (CDN), Three.js (CDN)  
**Reference Materials**:
- `Kimbo Brochure.AUG2024.pdf` - Product specs, modules, pricing
- `Kimbo_BrandExploration 2.pdf` - Brand guidelines, visual identity
- `images/` - 14 product photos (Kimbo_041320_*.jpg) for hero/gallery sections
- `TODO.md` - Full development roadmap

**Recommended Image Usage**:
- **Hero Background**: `Kimbo_041320_141.jpg` or `Kimbo_041320_152.jpg` (wide angle exterior shots)
- **Gallery Section**: All 14 images showcase different angles and lighting conditions
- **About/Features**: `Kimbo_041320_003.jpg`, `Kimbo_041320_019.jpg` (detail shots)
- **Interior Previews**: `Kimbo_041320_056.jpg`, `Kimbo_041320_063.jpg` (when showing modules)

## Brand Voice & Messaging (from current site)
**Tagline**: "NIMBLE. SIMPLE. LIVING."  
**Core Message**: Aluminum campers built to explore the world. A nimble home to keep you safe. A lifestyle of simplicity.

**Key Features to Highlight**:
- Aluminum, frameless construction (durable and lightweight)
- Maximizes interior space while keeping cost low
- Extended off-grid operation for boondocking
- Modular interior options with variable functions
- R-5 insulated interior
- Double pane windows with screens
- Multiple power options (solar and propane)

**About Story**: Founded by Mark King (Trayvax founder), inspired by nuclear submarine design (USS Alabama). Living minimally since 2013, started in 19' Airstream, built own camper in 2016. Drove 30,000+ miles testing before bringing to market.

**Company Info**:
- Location: 1790 Midway Lane, Bellingham, Washington, 98226
- Contact: sales@Kimboliving.com | 360-527-5296
- Social: YouTube, Facebook, Instagram, TikTok (@kimboliving)

## Design System - "Kimbo Twilight" Theme
Always use these CSS variables (defined in `style.css`):
- `--kimbo-midnight: #0B1026` - Primary background
- `--kimbo-metal: #E5E7EB` - Aluminum/secondary text
- `--kimbo-ember: #F97316` - CTA buttons/highlights

Body should use midnight background with white text by default.

## Project Structure
```
index.html                        - Main page with navbar, hero, configurator UI
style.css                         - Custom styles (variables, overrides)
script.js                         - 3D scene logic, configuration state, UI handlers
images/                           - Product photos (14 high-res JPGs)
  Kimbo_041320_*.jpg              - Professional product shots
Kimbo Brochure.AUG2024.pdf        - Official product documentation
Kimbo_BrandExploration 2.pdf      - Brand identity guidelines
TODO.md                           - Development roadmap (Vietnamese)
```

## Key Architecture Patterns

### Configuration State Management
Maintain a single `currentConfig` object in `script.js` tracking:
- Truck selection (mid-size vs full-size)
- Exterior options (solar panels, awning)
- Interior modules (fireplace, shower, refrigerator, etc.)
- Base price: $24,999

### Module Conflict Logic
**Critical**: Shower module conflicts with Seating Nook (same physical space)
- When "Foldaway Shower" is selected, auto-disable "Seating Nook" checkbox
- Display user-visible warning about the conflict
- Handle this in JS event handlers, not CSS

### 3D Scene Architecture (Three.js)
- Scene renders in `#canvas-container` div (600px height recommended)
- Use primitive shapes initially: `BoxGeometry` for prototyping
  - `createKimboShell()`: Silver/aluminum camper body
  - `createTruck()`: Black boxes for truck base
- Add `OrbitControls` for mouse-based camera rotation
- Lighting: `AmbientLight` + `DirectionalLight` (sun simulation)

### Interactive 3D-UI Binding
Each configurator checkbox/option should trigger 3D updates:
- `toggleSolarPanel(isVisible)`: Black thin box on roof
- `toggleFireplace(isVisible)`: Small chimney stack on roof
- Similar toggle functions for other visible modules

### Price & Weight Calculations
Implement these update functions called on any configuration change:
- `updateQuote()`: Sum base price + selected module prices → display in UI
- `updateWeight()`: Sum weights of selected modules → display total

**Example Module Pricing** (from `TODO.md`):
- Solar Panels: +$300
- Awning: +$1,000  
- Propane Fireplace: $2,350
- Foldaway Shower: $1,980
- Refrigerator: $3,850

## Development Workflow
1. Start with HTML boilerplate in `index.html`
2. Include CDN links in order: Bootstrap CSS → Bootstrap Icons → `style.css` → Three.js → OrbitControls → `script.js`
3. Build sections incrementally: Navbar → Hero → Configurator Panel → 3D Canvas
4. Connect UI controls to JS state before implementing 3D visuals
5. Use browser console for debugging Three.js scene setup

## UI Layout Conventions
- **Navbar**: Dark theme (`navbar-dark`), transparent/backdrop-filter background, "KIMBO" logo with bold font and wide letter-spacing
  - Links: "Camper 6", "Modules", "Contact"
  - CTA button: "Build Your Own" (Ember Orange)
  - Current site has: HOME, ABOUT US, DIMENSIONS+PICS, CONTACT US & BROCHURE, LETTERS (blog)
- **Hero Section**: Two-column layout (Bootstrap grid)
  - Left (`col-lg-5`): Headline "NIMBLE. SIMPLE. LIVING.", description, "Start Configuration" button (Ember Orange)
  - Right (`col-lg-7`): 3D canvas container OR product image as fallback
  - Consider using `images/Kimbo_041320_141.jpg` as background with overlay
- **Configurator Panel**: Floating/fixed panel or sidebar with sections:
  - **Section 1 - Truck**: Mid-size vs Full-size (Dropdown/Radio)
  - **Section 2 - Exterior**: Solar Panels, Awning (Checkboxes)
  - **Section 3 - Interior Modules**: Fireplace, Shower, Refrigerator, Seating Nook (Checkboxes with conflict handling)
  - **Section 4 - Summary**: Estimated Price + Total Weight display
- **Pricing Display**: Prominently show "$24,999" as base price for "KIMBO 6 BASE CAMPER 2025"
- **Footer**: Include social media links (YouTube, Facebook, Instagram, TikTok), Quick Links section, Contact info with map link

## Critical Details
- All CDN resources (Bootstrap, Three.js, OrbitControls) - no npm/build step
- Responsive design: Use Bootstrap grid classes (`col-lg-*`)
- 3D performance: Keep geometry simple initially, optimize later
- User feedback: Show loading states for 3D scene initialization

## What This Project Is NOT
- Not using React/Vue/Angular - vanilla JS only
- Not using build tools (webpack/vite) - direct HTML/CSS/JS files
- Not photorealistic 3D initially - use geometric primitives for MVP
