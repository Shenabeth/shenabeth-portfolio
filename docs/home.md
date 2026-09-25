/*
 * File: HOME.md
 * Purpose: Landing page (home) layout, content, and component tasks
 */

# HOME

## Page Structure (Top to Bottom)

1. Hero Section
2. Featured Projects Section (Horizontal Scroll)
3. Certifications Section
4. Contact Section
5. Footer (via layout)

---

## Hero Section

### Desktop Layout (1024px and up)
- [ ] Full viewport height (100vh or near it)
- [ ] Name: Large, bold heading (48-64px font size)
- [ ] Tagline: "Full-stack engineer building on AWS" (28-32px font size, gray/lighter text)
- [ ] Avatar: Circular image, right side of screen (200px diameter)
- [ ] Content left-aligned, avatar positioned right
- [ ] Social links below tagline, horizontal row (GitHub, LinkedIn, Credly)
- [ ] Resume button: Below social links (dark button with text "Resume")
- [ ] Contact button: Next to Resume (light or outlined button with text "Contact")
- [ ] Contact button scrolls to contact section below

### Tablet Layout (768px - 1023px)
- [ ] Full viewport height (80vh)
- [ ] Name: 40-48px font size
- [ ] Tagline: 22-24px font size
- [ ] Avatar: 160px diameter, positioned right but smaller
- [ ] Social links same row
- [ ] Buttons same row below
- [ ] Layout: left text, right avatar

### Mobile Layout (375px - 767px)
- [ ] Full viewport height (90vh)
- [ ] Name: 32-36px font size
- [ ] Tagline: 16-18px font size
- [ ] Avatar: 120px diameter, centered above name and tagline (or below tagline)
- [ ] Avatar centered, name below, tagline below name
- [ ] Social links: centered horizontal row below tagline
- [ ] Buttons: stacked vertically (Resume full width, Contact full width)
- [ ] Buttons full width, centered

### Tasks

#### HeroSection Component
- [ ] Create `src/components/home/HeroSection.tsx`
- [ ] Props: none
- [ ] Display name (hardcoded or from config)
- [ ] Display tagline (hardcoded or from config)
- [ ] Display avatar image (from public/avatar.jpg or similar)
- [ ] Social links: render horizontally (GitHub, LinkedIn, Credly icons)
- [ ] Resume button: download resume PDF
- [ ] Contact button: scroll to #contact (use smooth scroll)
- [ ] Responsive: desktop (left/right split), mobile (centered, stacked)
- [ ] No animations in Phase 1

#### SocialLinks Component (Shared)
- [ ] Create `src/components/shared/SocialLinks.tsx`
- [ ] Props: `className?: string` (for spacing customization)
- [ ] Render 3 links: GitHub, LinkedIn, Credly (SVG icons + text or icons only)
- [ ] Links open in new tab
- [ ] Icons 24x24px size (can adjust via props)
- [ ] Horizontal row layout
- [ ] Icons: simple SVG or text links with hover effect

---

## Featured Projects Section

### Desktop Layout (1024px and up)
- [ ] Container: full width
- [ ] Heading: "Featured Projects" (28-32px font size)
- [ ] Projects display as horizontal scroll (NOT a carousel)
- [ ] 3 project cards: Portfolio Site, SAI System, Dog Game
- [ ] Each card: 300-400px width, 350-400px height
- [ ] Cards visible: user can scroll left/right to see all
- [ ] Cards: no border, subtle shadow
- [ ] Spacing between cards: 1rem
- [ ] Scroll behavior: smooth, user can drag or use scroll wheel
- [ ] Scrollbar: visible or hidden (choose one)

### Tablet Layout (768px - 1023px)
- [ ] Same horizontal scroll
- [ ] Cards: 280-350px width
- [ ] Heading: 24-28px font size
- [ ] Spacing: 0.75rem between cards

### Mobile Layout (375px - 767px)
- [ ] Same horizontal scroll (touch-friendly)
- [ ] Cards: full width minus padding (viewport width - 2rem)
- [ ] Cards: 4:3 aspect ratio
- [ ] Heading: 20-24px font size
- [ ] Visible: 1 card at a time on mobile

### Tasks

#### FeaturedProjectsSection Component
- [ ] Create `src/components/home/FeaturedProjectsSection.tsx`
- [ ] Props: `projects: Project[]` (array of 3 featured projects)
- [ ] Render heading: "Featured Projects"
- [ ] Render horizontal scroll container
- [ ] Render 3 ProjectCard components inside
- [ ] Responsive: adjust card width based on breakpoint

#### ProjectCard Component
- [ ] Create `src/components/home/ProjectCard.tsx`
- [ ] Props:
  - `title: string`
  - `description: string`
  - `techStack: string[]`
  - `demoLink?: string`
  - `githubLink: string`
  - `caseStudyLink?: string`
  - `status?: string` ("live", "coming-soon", "in-progress")
- [ ] Display:
  - Project title (18-20px font size)
  - Short description (14px font size)
  - Tech stack as small badges/tags
  - Buttons: GitHub, Demo (if available), Case Study (if available)
- [ ] Status badge (if status is "coming-soon", show "Coming Soon" badge)
- [ ] Responsive: base styles work on all screen sizes

---

## Certifications Section

### Desktop/Tablet/Mobile
- [ ] Container: full width
- [ ] Heading: "Certifications" (24-28px font size)
- [ ] Display: grid layout (responsive)
- [ ] Desktop: 3-4 certs per row
- [ ] Tablet: 2-3 certs per row
- [ ] Mobile: 1-2 certs per row
- [ ] Each cert: badge/card with name and date earned
- [ ] Badges: small, clickable (link to Credly profile)
- [ ] Badge size: adjusts for screen size

### Tasks

#### CertificationsSection Component
- [ ] Create `src/components/home/CertificationsSection.tsx`
- [ ] Props: none (hardcoded certs for now)
- [ ] Data: CompTIA Tech+, AWS CLF (Cloud Practitioner), AWS SAA-C03 (when passed)
- [ ] Render heading: "Certifications"
- [ ] Render grid of cert badges
- [ ] Each badge displays: cert name, date earned
- [ ] Badge links to Credly profile (opens in new tab)
- [ ] Responsive: grid adjusts columns for screen size

#### CertificationBadge Component (Shared)
- [ ] Create `src/components/shared/CertificationBadge.tsx`
- [ ] Props:
  - `name: string`
  - `issuer: string`
  - `dateEarned: string`
  - `credlyUrl: string`
- [ ] Display: small card or badge with name and date
- [ ] Click: opens Credly URL in new tab
- [ ] Styling: consistent badge style

---

## Contact Section

### Desktop/Tablet Layout (768px and up)
- [ ] Container: max-width container, centered
- [ ] Heading: "Get in Touch" (24-28px font size)
- [ ] Form: contact form component
- [ ] Form width: 500-600px, centered

### Mobile Layout (375px - 767px)
- [ ] Heading: "Get in Touch" (20-24px font size)
- [ ] Form: full width minus padding
- [ ] Form uses full width

### Tasks

#### ContactSection Component
- [ ] Create `src/components/home/ContactSection.tsx`
- [ ] Props: none
- [ ] Render heading: "Get in Touch"
- [ ] Render ContactForm component below
- [ ] Container: full width background, padded
- [ ] Background: subtle, different from page background (optional)

#### ContactForm Component
- [ ] Create `src/components/home/ContactForm.tsx`
- [ ] Props: none
- [ ] Fields:
  - Name (text input)
  - Email (email input)
  - Message (textarea)
- [ ] Submit button: "Send Message" (dark button)
- [ ] On submit:
  - Validate all fields required, email format valid
  - Show loading state (button disabled, spinner or text "Sending...")
  - Call POST /api/contact endpoint
  - On success: show "Message sent successfully!" and clear form
  - On error: show error message
- [ ] Form state:
  - `name: string`
  - `email: string`
  - `message: string`
  - `isLoading: boolean`
  - `success: boolean`
  - `error: string | null`
- [ ] Styling: use shadcn/ui form components (Input, Textarea, Button)
- [ ] Mobile: full width inputs
- [ ] Responsive: adjusts for screen size

---

## Page-Level Tasks

### Home Page (src/app/page.tsx)
- [ ] Create landing page
- [ ] Import and render: HeroSection, FeaturedProjectsSection, CertificationsSection, ContactSection
- [ ] Layout: stacked vertically
- [ ] No margin/padding between sections (sections handle their own spacing)
- [ ] Background: dark (default Tailwind dark)
- [ ] Responsive: all sections stack correctly on mobile

### Data / Hardcoded Content
- [ ] Featured projects (3): Portfolio Site, SAI System, Dog Game
  - Each has: title, description, tech stack, links, status
  - Store in config or hardcoded in component
- [ ] Certifications (3): CompTIA Tech+, AWS CLF, AWS SAA-C03
  - Each has: name, issuer, date earned, Credly URL
  - Store in config or hardcoded in component

---

## Responsive Testing Checklist
- [ ] Desktop (1440px): Hero left/right split, projects scroll visible, all content readable
- [ ] Laptop (1024px): Same as desktop but slightly compressed
- [ ] Tablet (768px): Hero narrower, projects scroll works, form readable
- [ ] Mobile (375px): Hero stacked (avatar top), projects 1 at a time, form full width
- [ ] Touch scroll: featured projects work with touch swipe (horizontal scroll)
- [ ] Text readable: no text too small on mobile (minimum 16px for inputs)

---

## Design Notes
- [ ] No animations Phase 1 (all transitions added Phase 2)
- [ ] Dark background: Tailwind dark defaults
- [ ] Text colors: white/light gray on dark background
- [ ] Links: hover state changes color slightly
- [ ] Buttons: two styles: dark (primary) and outlined (secondary)
