/*
 * File: ABOUT.md
 * Purpose: About page layout, content sections, and component tasks
 */

# ABOUT

## Page Structure (Top to Bottom)

1. Page Heading
2. Education Section
3. Skills Section
4. Philosophy Section (Optional)
5. Footer (via layout)

---

## Education Section

### Content
- [ ] Degree: Computer Science
- [ ] University: [Your University]
- [ ] No graduation date (avoid age discrimination per resume principles)

### Desktop/Tablet/Mobile Layout
- [ ] Container: max-width 800px, centered
- [ ] Heading: "Education" (24-28px font size)
- [ ] Degree text: "Computer Science, [University]" (16-18px font size)
- [ ] Spacing: 1.5rem below heading, 2rem below section

### Tasks

#### EducationSection Component
- [ ] Create `src/components/about/EducationSection.tsx`
- [ ] Props: none (hardcoded content)
- [ ] Display heading: "Education"
- [ ] Display degree and university
- [ ] Responsive: padding adjusts for mobile

---

## Skills Section

### Content Organization
- [ ] **Frontend:** React, TypeScript, Next.js, Tailwind CSS, shadcn/ui, Framer Motion, React Native
- [ ] **Backend/Full-Stack:** Node.js, API design, authentication, database design, serverless
- [ ] **Cloud/AWS:** S3, CloudFront, Lambda, API Gateway, DynamoDB, Cognito, EC2, RDS, Secrets Manager
- [ ] **AI/ML:** Prompt engineering, LLM integration, agent design, model selection
- [ ] **Tools & Practices:** Git, GitHub, GitHub Actions, TypeScript, responsive design, dark mode
- [ ] **Other:** UX/UI design, web analytics, C++, React Native

### Desktop/Tablet Layout (768px and up)
- [ ] Heading: "Skills" (24-28px font size)
- [ ] Each skill category as separate subsection:
  - [ ] Category name (18-20px font size, bold)
  - [ ] Skills as tags/badges, horizontal row
  - [ ] Spacing between categories: 1.5rem
- [ ] Skills displayed as small badges/tags (pill-shaped)
- [ ] Badge styling: subtle background, light text, no border
- [ ] Each badge: 8-10px padding, 12-14px font size

### Mobile Layout (375px - 767px)
- [ ] Heading: "Skills" (20-24px font size)
- [ ] Same category structure
- [ ] Skills as tags, wrap to multiple lines if needed
- [ ] Smaller badge size (reduced padding)
- [ ] Spacing between categories: 1rem

### Tasks

#### SkillsSection Component
- [ ] Create `src/components/about/SkillsSection.tsx`
- [ ] Props: none (hardcoded skills data)
- [ ] Data structure:
  ```
  [
    { category: "Frontend", skills: [...] },
    { category: "Backend/Full-Stack", skills: [...] },
    { category: "Cloud/AWS", skills: [...] },
    { category: "AI/ML", skills: [...] },
    { category: "Tools & Practices", skills: [...] },
    { category: "Other", skills: [...] }
  ]
  ```
- [ ] Render heading: "Skills"
- [ ] For each category:
  - [ ] Render category name
  - [ ] Render skills as badges (use SkillBadge component)
- [ ] Responsive: badges wrap on mobile

#### SkillBadge Component (Shared)
- [ ] Create `src/components/shared/SkillBadge.tsx`
- [ ] Props: `label: string`
- [ ] Display: small pill-shaped badge with skill name
- [ ] Styling: subtle background, consistent across all badges
- [ ] No click action; informational only

---

## Philosophy Section (Optional - Decide Now)

### Decision Point
- [ ] Include philosophy section? YES / NO
- [ ] If YES, proceed with below
- [ ] If NO, delete this section from ABOUT.md

### Content (if included)
- [ ] Heading: "How I Think About Building" or similar
- [ ] 3-4 short sentences or bullet points reflecting work philosophy
- [ ] Examples (from cover letter):
  - "I thrive in ambiguity. Give me scattered requirements, and I find the structure inside them."
  - "Flexibility beats one-size-fits-all. The best solutions adapt to how people actually work."
  - "Shipping a good solution beats perfecting a theoretical one."
  - "I build across the stack because understanding each layer makes better decisions."

### Desktop/Tablet/Mobile Layout
- [ ] Heading: "How I Think About Building" (24-28px font size)
- [ ] Content: left-aligned text or bullet points
- [ ] Each bullet: 16px font size
- [ ] Spacing: 1rem between bullets
- [ ] Responsive: padding adjusts for mobile

### Tasks (if included)

#### PhilosophySection Component
- [ ] Create `src/components/about/PhilosophySection.tsx`
- [ ] Props: none (hardcoded content)
- [ ] Display heading: "How I Think About Building"
- [ ] Display bullet points or paragraphs
- [ ] Responsive: padding adjusts for mobile

---

## Page-Level Tasks

### About Page (src/app/about/page.tsx)
- [ ] Create about page
- [ ] Import and render:
  - [ ] EducationSection
  - [ ] SkillsSection
  - [ ] PhilosophySection (if included)
- [ ] Layout: stacked vertically
- [ ] Container: max-width 800px, centered
- [ ] Background: dark (default)
- [ ] Padding: 2rem top/bottom, 1rem left/right (adjusts for mobile)
- [ ] Responsive: all sections stack correctly on mobile

---

## Design Notes
- [ ] No animations Phase 1
- [ ] Dark background: Tailwind dark defaults
- [ ] Text colors: white/light gray on dark background
- [ ] Skill badges: subtle background (e.g., slate-700 or gray-700)
- [ ] All text readable on mobile (minimum 16px for body text)

---

## Responsive Testing Checklist
- [ ] Desktop (1440px): sections well-spaced, skills in single row per category
- [ ] Tablet (768px): same layout, slightly tighter spacing
- [ ] Mobile (375px): sections stack, skills wrap if needed, text readable
- [ ] Text sizing: no text too small on mobile
