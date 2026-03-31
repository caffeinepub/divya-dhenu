# Divya Dhenu eCommerce Website

## Current State
New project — no existing application files.

## Requested Changes (Diff)

### Add
- Multi-page React SPA with React Router: Home, Products, About, Contact, Login
- Shared Header (sticky, with logo, nav links, hamburger on mobile) and Footer on all pages
- Announcement marquee bar at top
- Hero section with heading, subheading, CTA
- Featured Products section (Desi Ghee, Agarbatti) with cards, price, Add to Cart
- Why Choose Us section (4 feature tiles)
- About preview section
- Testimonials section (3 reviews)
- CTA section "Bring Home Purity Today"
- Full Products page with detailed cards
- Full About page with brand story
- Contact page with form (Name, Email, Message) and address/phone UI
- Login page (Email, Password, Create Account link)
- Cart logic: if not logged in → redirect to /login; if logged in → add to localStorage cart
- Smooth scroll, hover lift animations, scroll reveal, page loader
- Mobile hamburger menu
- Basic form validation
- SEO meta tags

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan
1. Generate product images (Desi Ghee, Agarbatti) and hero background
2. Build React components: Layout (Header + Footer), AnnouncementBar, HeroSection, FeaturedProducts, WhyChooseUs, AboutPreview, Testimonials, CTASection
3. Build pages: Home, Products, About, Contact, Login
4. Implement cart logic with localStorage and auth state
5. Add animations: fade-in on scroll, hover lift, page loader
6. Ensure full mobile responsiveness
