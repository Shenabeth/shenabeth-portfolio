/*
 * File: SHARED.md
 * Purpose: Shared/utility components and hooks used across the site
 */

# SHARED

Shared components are used across multiple pages. Build once, reuse everywhere.

---

## Shared Components

### Button Component

#### Purpose
Primary action button (from shadcn/ui, extended if needed)

#### Tasks
- [ ] Create `src/components/shared/Button.tsx`
- [ ] Base: use shadcn/ui Button component
- [ ] Props:
  - [ ] `children: ReactNode`
  - [ ] `onClick?: () => void`
  - [ ] `variant?: "default" | "outline" | "ghost"`
  - [ ] `size?: "sm" | "md" | "lg"`
  - [ ] `disabled?: boolean`
  - [ ] `className?: string` (for custom styling)
- [ ] Variants:
  - [ ] **default:** dark background, white text (primary button)
  - [ ] **outline:** border only, transparent background (secondary button)
  - [ ] **ghost:** no styling, text only (tertiary button)
- [ ] Responsive: size adjusts for mobile if needed
- [ ] Hover state: subtle color change

---

### Card Component

#### Purpose
Container for content (from shadcn/ui)

#### Tasks
- [ ] Create `src/components/shared/Card.tsx`
- [ ] Base: use shadcn/ui Card component
- [ ] Props:
  - [ ] `children: ReactNode`
  - [ ] `className?: string`
- [ ] Styling: subtle shadow or border, rounded corners
- [ ] Dark background: consistent with site theme

---

### Badge Component

#### Purpose
Small tag/label for categories, status, tech stack

#### Tasks
- [ ] Create `src/components/shared/Badge.tsx`
- [ ] Base: use shadcn/ui Badge component
- [ ] Props:
  - [ ] `label: string`
  - [ ] `variant?: "default" | "secondary" | "accent"`
- [ ] Variants:
  - [ ] **default:** gray background, white text
  - [ ] **secondary:** slightly lighter background
  - [ ] **accent:** colored background (optional)
- [ ] Size: small (12-14px font, 6-8px padding)
- [ ] Responsive: size stays consistent on mobile

---

### SkillBadge Component

#### Purpose
Display individual skill as a badge (already defined in ABOUT.md)

#### Reference
See ABOUT.md > SkillBadge Component

---

### CertificationBadge Component

#### Purpose
Display individual certification badge (already defined in HOME.md)

#### Reference
See HOME.md > CertificationBadge Component

---

### SocialLinks Component

#### Purpose
Display social media links (already defined in HOME.md)

#### Reference
See HOME.md > SocialLinks Component

---

### ProjectCard Component

#### Purpose
Display a single project in card format (used in featured projects scroll on home page)

#### Reference
See HOME.md > ProjectCard Component

---

## Form Components (shadcn/ui)

These are provided by shadcn/ui. Import and use as-is:

### Input
- [ ] Text input field
- [ ] Props: `type`, `placeholder`, `value`, `onChange`, etc.

### Textarea
- [ ] Multi-line text input
- [ ] Props: `placeholder`, `value`, `onChange`, etc.

### Select
- [ ] Dropdown select menu
- [ ] Props: `options`, `value`, `onChange`, etc.

### Checkbox
- [ ] Single checkbox (true/false)
- [ ] Props: `checked`, `onChange`, etc.

### Label
- [ ] Form field label
- [ ] Props: `htmlFor`, `children`, etc.

---

## Custom Hooks

### useAuth Hook

#### Purpose
Manage authentication state and API calls

#### Tasks
- [ ] Create `src/hooks/useAuth.ts`
- [ ] Returns:
  - [ ] `isAuthenticated: boolean` — User has valid token
  - [ ] `user: User | null` — Current user object (if authenticated)
  - [ ] `accessToken: string | null` — Current access token
  - [ ] `login: (email: string, password: string) => Promise<void>` — Login user
  - [ ] `logout: () => Promise<void>` — Logout user
  - [ ] `isLoading: boolean` — True while auth request in progress
  - [ ] `error: string | null` — Error message if auth fails
- [ ] Stores tokens in localStorage or secure HttpOnly cookies
- [ ] On component mount: check if token exists, set isAuthenticated
- [ ] On login: store tokens, set isAuthenticated
- [ ] On logout: clear tokens, set isAuthenticated to false
- [ ] Handle token refresh automatically if token expires

---

### useProjects Hook (Phase 2)

#### Purpose
Fetch and manage projects

#### Tasks
- [ ] Create `src/hooks/useProjects.ts`
- [ ] Returns:
  - [ ] `projects: Project[]` — Array of projects
  - [ ] `isLoading: boolean` — True while fetching
  - [ ] `error: string | null` — Error message if fetch fails
  - [ ] `fetchProjects: (featured?: boolean) => Promise<void>` — Fetch projects
  - [ ] `createProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Project>` — Create project (admin)
  - [ ] `updateProject: (id: string, project: Partial<Project>) => Promise<Project>` — Update project (admin)
  - [ ] `deleteProject: (id: string) => Promise<void>` — Delete project (admin)
- [ ] On component mount: fetch projects
- [ ] Cache projects locally to avoid re-fetching
- [ ] Invalidate cache when projects are created/updated/deleted

---

### useFetch Hook (Utility)

#### Purpose
Generic hook for making API calls

#### Tasks
- [ ] Create `src/hooks/useFetch.ts`
- [ ] Props:
  - [ ] `url: string` — API endpoint
  - [ ] `method?: "GET" | "POST" | "PUT" | "DELETE"` (default: GET)
  - [ ] `body?: any` — Request body (for POST/PUT)
  - [ ] `token?: string` — Auth token (for protected routes)
- [ ] Returns:
  - [ ] `data: any` — Response data
  - [ ] `isLoading: boolean`
  - [ ] `error: string | null`
  - [ ] `refetch: () => Promise<void>` — Re-run the request
- [ ] Handles authorization headers (Bearer token)
- [ ] Handles errors and displays error messages
- [ ] Can be used by other hooks

---

## Utility Functions

### lib/api.ts

#### Purpose
API client functions for calling backend

#### Tasks
- [ ] Create `src/lib/api.ts`
- [ ] Functions:
  - [ ] `async getProjects(token?: string): Promise<Project[]>` — GET /api/projects
  - [ ] `async getProject(id: string, token?: string): Promise<Project>` — GET /api/projects/:id
  - [ ] `async createProject(project: any, token: string): Promise<Project>` — POST /api/projects (admin)
  - [ ] `async updateProject(id: string, project: any, token: string): Promise<Project>` — PUT /api/projects/:id (admin)
  - [ ] `async deleteProject(id: string, token: string): Promise<void>` — DELETE /api/projects/:id (admin)
  - [ ] `async login(email: string, password: string): Promise<AuthResponse>` — POST /api/auth/login
  - [ ] `async logout(token: string): Promise<void>` — POST /api/auth/logout
  - [ ] `async refreshToken(refreshToken: string): Promise<AuthResponse>` — POST /api/auth/refresh
  - [ ] `async sendContactEmail(data: ContactFormData): Promise<void>` — POST /api/contact
- [ ] Base URL from env var: `NEXT_PUBLIC_API_BASE_URL`
- [ ] Include auth tokens in Authorization header (Bearer token)
- [ ] Handle errors and throw with descriptive messages

---

### lib/utils.ts

#### Purpose
General utility functions

#### Tasks
- [ ] Create `src/lib/utils.ts`
- [ ] Functions:
  - [ ] `formatDate(date: string): string` — Format ISO date to readable format (e.g., "Sep 25, 2026")
  - [ ] `validateEmail(email: string): boolean` — Validate email format
  - [ ] `validateUrl(url: string): boolean` — Validate URL format
  - [ ] `cn(...classes: any[]): string` — Merge Tailwind classes (use clsx or classnames library)
  - [ ] `debounce(fn: Function, delay: number): Function` — Debounce function calls
- [ ] Export utilities for use throughout the site

---

### lib/auth.ts

#### Purpose
Authentication helper functions

#### Tasks
- [ ] Create `src/lib/auth.ts`
- [ ] Functions:
  - [ ] `getAccessToken(): string | null` — Get stored access token
  - [ ] `getRefreshToken(): string | null` — Get stored refresh token
  - [ ] `setTokens(accessToken: string, refreshToken: string, expiresIn: number): void` — Store tokens
  - [ ] `clearTokens(): void` — Clear stored tokens
  - [ ] `isTokenExpired(): boolean` — Check if access token expired
  - [ ] `setTokenExpiration(expiresIn: number): void` — Calculate and store expiration time
- [ ] Use localStorage or secure cookies for storage
- [ ] Include token expiration logic

---

## TypeScript Types

### src/types/index.ts

#### Purpose
Centralize all TypeScript type definitions

#### Tasks
- [ ] Create `src/types/index.ts`
- [ ] Interfaces/Types:

```typescript
// Project type
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  demoLink?: string;
  githubLink: string;
  caseStudyLink?: string;
  status?: 'live' | 'coming-soon' | 'in-progress';
  featured?: boolean;
  imageUrl?: string;
  architectureImageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
}

// User type
export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
  createdAt?: string;
}

// Auth response from login
export interface AuthResponse {
  accessToken: string;
  idToken: string;
  refreshToken: string;
  expiresIn: number;
}

// Contact form data
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// API response format (generic)
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  code?: string;
  statusCode?: number;
}

// Skill category (for About page)
export interface SkillCategory {
  category: string;
  skills: string[];
}

// Certification (for Home page)
export interface Certification {
  id: string;
  name: string;
  issuer: string;
  dateEarned: string;
  credlyUrl: string;
  badgeUrl?: string;
}
```

---

## Configuration

### src/config/constants.ts

#### Purpose
Hardcoded constants and config

#### Tasks
- [ ] Create `src/config/constants.ts`
- [ ] Constants:
  - [ ] API base URL
  - [ ] Cognito region and user pool ID
  - [ ] Featured projects data (3 hardcoded projects)
  - [ ] Certifications data (CompTIA Tech+, AWS CLF, AWS SAA-C03)
  - [ ] Skills data (by category)
  - [ ] Social media links (GitHub, LinkedIn, Credly URLs)
  - [ ] Contact email address
- [ ] Example:
```typescript
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.yourdomain.com';

export const FEATURED_PROJECTS: Project[] = [
  {
    id: 'portfolio-site',
    title: 'Portfolio Site',
    description: '...',
    // ...
  },
  // 2 more projects
];

export const SOCIAL_LINKS = {
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername',
  credly: 'https://credly.com/users/yourusername',
};
```

---

## Responsive Design Helpers

### tailwind.config.ts

#### Purpose
Configure Tailwind CSS (already exists, extend as needed)

#### Tasks
- [ ] Extend Tailwind config with:
  - [ ] Custom colors (dark theme palette)
  - [ ] Custom spacing (if needed beyond defaults)
  - [ ] Custom typography (font sizes, line heights)
  - [ ] Dark mode configuration (already enabled)
  - [ ] Animation timing (for Phase 2)

---

## Notes
- All shared components must be reusable (no hardcoded content)
- Pass data via props
- Keep components small and focused
- Use TypeScript interfaces for all props
