/*
 * File: NAV_FOOTER.md
 * Purpose: Navigation bar and footer layout, responsive behavior, and tasks
 */

# NAV_FOOTER

## Navigation Bar

### Desktop Layout (1024px and up)
- [ ] Left: Logo/name text (clickable, links to home)
- [ ] Center: Nav links — Home | About | Projects (dark text, no underline)
- [ ] Right: Resume button (dark button with text "Resume", downloads PDF)
- [ ] Sticky to top
- [ ] Dark background (use Tailwind dark bg)
- [ ] Subtle shadow or border-bottom
- [ ] Height: 60-64px
- [ ] Spacing: 1rem padding left/right

### Tablet Layout (768px - 1023px)
- [ ] Same layout as desktop but smaller padding
- [ ] Font size slightly reduced for nav links
- [ ] Spacing: 0.75rem padding left/right

### Mobile Layout (375px - 767px)
- [ ] Left: Logo/name text (same)
- [ ] Center: Hamburger menu icon (3 lines)
- [ ] Right: Resume button (text only, no icon)
- [ ] Height: 56px
- [ ] Clicking hamburger opens dropdown menu (Home, About, Projects)
- [ ] Dropdown menu slides down from nav bar
- [ ] Dropdown items full width, stacked vertically
- [ ] Dropdown has dark background, slightly lighter than nav bar
- [ ] Dropdown closes when user clicks a link or outside dropdown

### Mobile Dropdown Menu
- [ ] Display only on mobile (below 768px)
- [ ] Home | About | Projects (stacked, full width)
- [ ] Each item: 48px height, centered text
- [ ] Smooth slide-down animation (no animation in Phase 1, but CSS prepared)
- [ ] Closes when user navigates or clicks outside

### Tasks

#### NavBar Component
- [ ] Create `src/components/layout/NavBar.tsx`
- [ ] Props: `currentPage?: string` (highlights active page)
- [ ] Responsive: desktop (3-part layout) → tablet (same, smaller) → mobile (logo + hamburger + resume)
- [ ] Resume button: downloads PDF from public/resume.pdf
- [ ] Mobile hamburger toggles dropdown menu state
- [ ] Logo/name links to home (/)
- [ ] Nav links: Home (/), About (/about), Projects (/projects)
- [ ] All links should use Next.js Link component (client-side navigation)
- [ ] Sticky positioning: `sticky top-0 z-50`
- [ ] Keyboard accessible: nav links and buttons

---

## Footer

### Desktop/Tablet Layout (768px and up)
- [ ] Left: Your name (plain text, dark text)
- [ ] Right: Social icons (GitHub, LinkedIn, Credly) + Contact link
- [ ] Minimal, one-line footer
- [ ] Dark background (same as nav or slightly different)
- [ ] Subtle top border or shadow
- [ ] Height: 48-56px
- [ ] Spacing: 1rem padding left/right, centered vertically

### Mobile Layout (375px - 767px)
- [ ] Left: Your name (plain text)
- [ ] Right: Social icons (smaller size, same links)
- [ ] Height: 56px
- [ ] Spacing: 0.75rem padding left/right
- [ ] Icons slightly smaller

### Admin Login Link
- [ ] Very subtle, small text
- [ ] Located: far right of footer, or bottom-right corner
- [ ] Text: "Admin" or just an icon (gear icon)
- [ ] Link to: `/admin/login`
- [ ] NOT prominent; meant for you only

### Social Link Order (Left to Right)
1. GitHub (svg icon or text link)
2. LinkedIn (svg icon or text link)
3. Credly (svg icon or text link)
4. Contact form link (text: "Contact" or envelope icon)

### Tasks

#### Footer Component
- [ ] Create `src/components/layout/Footer.tsx`
- [ ] Props: none
- [ ] Responsive: desktop (one line, left-right layout) → mobile (same, smaller)
- [ ] Social links: GitHub, LinkedIn, Credly (SVG icons or text links, your choice)
- [ ] Contact link: links to #contact (scroll to contact section on home page) or `/contact` page
- [ ] Admin login: subtle "Admin" text link to `/admin/login`
- [ ] All links open in new tab except internal nav (Contact)
- [ ] Footer padding/margin matches nav bar styling
- [ ] Dark background consistent with nav bar

---

## Responsive Breakpoints (Tailwind)

Use these breakpoints for responsive design:
- [ ] `sm:` (640px) — small screens
- [ ] `md:` (768px) — tablets
- [ ] `lg:` (1024px) — laptops/desktops
- [ ] `xl:` (1280px) — large desktops
- [ ] `2xl:` (1536px) — ultra-wide

For nav/footer, focus on:
- [ ] Mobile-first: base styles for 375px
- [ ] `md:` for tablets (768px)
- [ ] `lg:` for desktop (1024px)

---

## Design Notes

- [ ] No animations in Phase 1 (Framer Motion comes Phase 2)
- [ ] Dark background: use Tailwind's `bg-slate-900` or `bg-gray-900`
- [ ] Text color: `text-white` or `text-slate-200` (readable on dark background)
- [ ] Icons: use SVG icons (can hand-code or find in public domain)
- [ ] Hover states: subtle color change on links (use Tailwind `hover:` classes)
- [ ] Mobile hamburger icon: can use text "☰" or custom SVG

---

## Accessibility

- [ ] All links have descriptive text (not just icons)
- [ ] Nav bar has `<nav>` semantic HTML tag
- [ ] Footer has `<footer>` semantic HTML tag
- [ ] Keyboard navigation: Tab through all links in logical order
- [ ] Focus states: visible outline when tabbing (Tailwind focus:ring-* classes)
- [ ] Icons with links should have aria-label or title attribute
