/*
 * File: PROJECTS.md
 * Purpose: Projects page layout, featured projects, and component tasks
 */

# PROJECTS

## Page Structure (Top to Bottom)

1. Page Heading
2. Featured Projects (3 expanded project cards)
3. More Projects Section (empty placeholder, for Phase 2)
4. Footer (via layout)

---

## Featured Projects Section

### Desktop/Tablet/Mobile
- [ ] Container: full width
- [ ] Heading: "Projects" (32-36px font size, page title)
- [ ] 3 featured project cards displayed as full-width or near full-width sections
- [ ] Each card: expanded view with full details
- [ ] Cards stacked vertically
- [ ] Spacing between cards: 2rem

### Featured Project 1: Portfolio Site

#### Content
- [ ] Title: "Portfolio Site"
- [ ] Description: "A dynamic portfolio site built with Next.js and hosted on AWS. Features admin authentication, dynamic project pages stored in DynamoDB, and responsive design. This site is a case study in full-stack development and serverless architecture."
- [ ] Tech Stack: Next.js, TypeScript, Tailwind CSS, AWS (S3, CloudFront, Lambda, API Gateway, DynamoDB, Cognito)
- [ ] Links:
  - [ ] GitHub: [link to your repo]
  - [ ] Live Demo: [this site]
  - [ ] Case Study: [link or embedded info]
- [ ] Status: "live"
- [ ] Why Built: "To consolidate my portfolio, learn AWS services hands-on for Solutions Architect certification, and demonstrate full-stack development skills."
- [ ] Architecture Diagram: (optional for Phase 1, can add Phase 2)

### Featured Project 2: SAI System

#### Content
- [ ] Title: "SAI System"
- [ ] Description: "A bring-your-own-key AI platform. Users log in, add their OpenAI/Claude/other LLM API keys, and interact with custom AI agents. Features user authentication, chat history persistence, and flexible agent customization. (Learning game feature coming soon.)"
- [ ] Tech Stack: Next.js, TypeScript, Supabase (current), AWS (migrating backend)
- [ ] Links:
  - [ ] GitHub: [link to your repo]
  - [ ] Case Study: [link with architecture details]
  - [ ] Live Demo: Coming Soon (after AWS migration)
- [ ] Status: "coming-soon"
- [ ] Why Built: "To explore full-stack auth patterns, LLM API integration, and flexible agent design. Also scratches the itch of building a tool that adapts to different user needs."
- [ ] Architecture Diagram: (show current Supabase setup, or planned AWS setup)

### Featured Project 3: Dog Game

#### Content
- [ ] Title: "Dog Game"
- [ ] Description: "A browser-based game about raising and training a dog, built with Unity and hosted on Vercel. Focuses on intuitive gameplay and engaging progression mechanics."
- [ ] Tech Stack: Unity, C#, Vercel
- [ ] Links:
  - [ ] GitHub: [link to your repo]
  - [ ] Live Demo: [playable game link]
- [ ] Status: "live"
- [ ] Why Built: "To explore game design, UX in interactive contexts, and shipping polish. A break from traditional web dev while still demonstrating design and execution skills."
- [ ] Gameplay Notes: (optional)

### Tasks

#### ProjectsPage (src/app/projects/page.tsx)
- [ ] Create projects page
- [ ] Import and render:
  - [ ] Page heading: "Projects"
  - [ ] FeaturedProjectsGrid component (3 projects)
  - [ ] MoreProjectsSection component (placeholder for Phase 2)
- [ ] Layout: stacked vertically
- [ ] Background: dark
- [ ] Padding: 2rem top/bottom, 1rem left/right (mobile adjusts)
- [ ] Responsive: all sections stack correctly

#### FeaturedProjectsGrid Component
- [ ] Create `src/components/projects/FeaturedProjectsGrid.tsx`
- [ ] Props: `projects: Project[]` (array of 3 featured projects)
- [ ] Render heading: "Featured Projects"
- [ ] For each project:
  - [ ] Render ExpandedProjectCard component
- [ ] Layout: stacked vertically
- [ ] Spacing: 2rem between cards

#### ExpandedProjectCard Component
- [ ] Create `src/components/projects/ExpandedProjectCard.tsx`
- [ ] Props:
  - `title: string`
  - `description: string`
  - `longDescription?: string`
  - `techStack: string[]`
  - `demoLink?: string`
  - `githubLink: string`
  - `caseStudyLink?: string`
  - `status?: string`
  - `whyBuilt?: string`
  - `architectureImageUrl?: string`
- [ ] Display:
  - [ ] Title (28-32px font size)
  - [ ] Status badge (if applicable, e.g., "Coming Soon")
  - [ ] Long description or detailed description (16px font size)
  - [ ] Tech stack as badges
  - [ ] Links: GitHub, Demo (if available), Case Study (if available)
  - [ ] "Why I Built It" section (optional)
  - [ ] Architecture diagram (optional, Phase 2)
- [ ] Responsive: content adjusts for screen size
  - [ ] Desktop: max-width 900px, centered
  - [ ] Tablet: full width minus padding
  - [ ] Mobile: full width minus padding
- [ ] Card styling: subtle border or shadow, rounded corners
- [ ] Link buttons: consistent styling (GitHub, Demo, Case Study buttons)

---

## More Projects Section

### Phase 1 (MVP)
- [ ] Display: placeholder message "More projects coming soon"
- [ ] Hidden or very subtle (don't draw attention)
- [ ] Ready for Phase 2: will populate with admin-added projects from DynamoDB

### Phase 2+
- [ ] Grid layout (responsive columns)
- [ ] Fetch projects from `/api/projects?featured=false`
- [ ] Render ProjectCard for each project
- [ ] Allow sorting, filtering (optional Phase 3)

### Tasks

#### MoreProjectsSection Component
- [ ] Create `src/components/projects/MoreProjectsSection.tsx`
- [ ] Props: `projects: Project[]` (fetched from API, Phase 2)
- [ ] Phase 1: render placeholder text only
- [ ] Phase 2: render grid of ProjectCard components
- [ ] Conditional: only show if projects exist (Phase 2+)

---

## Shared Project Components

### ProjectCard Component (used in featured projects scroll on home page)
Already defined in HOME.md. Reuse here if needed for MoreProjectsSection (Phase 2).

---

## Page-Level Tasks

### Projects Page Layout
- [ ] Max-width container: 1000px (optional, can be full-width with padding)
- [ ] Center content: use container utilities
- [ ] Padding: 2rem top/bottom, 1rem left/right
- [ ] Mobile padding: 1rem top/bottom, 1rem left/right

---

## Responsive Testing Checklist
- [ ] Desktop (1440px): cards full-width or max-width, all details visible
- [ ] Tablet (768px): cards full width minus padding, text readable
- [ ] Mobile (375px): cards full width, stacked vertically, buttons full-width or inline based on space
- [ ] Text readable: no font size below 14px for body text
- [ ] Links visible: clickable area at least 44x44px (mobile friendly)

---

## Design Notes
- [ ] No animations Phase 1
- [ ] Dark background: Tailwind dark defaults
- [ ] Text colors: white/light gray on dark
- [ ] Card styling: subtle shadow or border, rounded corners (use Tailwind)
- [ ] Button styling: dark buttons for primary actions, outlined for secondary
- [ ] Tech stack badges: small, pill-shaped, consistent color
- [ ] Status badge: "Coming Soon" visible but not intrusive
