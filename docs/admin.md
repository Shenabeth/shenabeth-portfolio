/*
 * File: ADMIN.md
 * Purpose: Admin panel components, authentication, and tasks (Phase 2)
 * Phase 1: Not building yet. Phase 2: Build these components.
 */

# ADMIN (Phase 2)

This file describes admin panel components. Phase 1 does not include admin functionality.

Phase 2 timeline: After MVP launches and you're happy with landing/about/projects pages.

---

## Admin Panel Overview

- [ ] Route: `/admin` (protected)
- [ ] Route: `/admin/login` (public, login form)
- [ ] Admin user: You (email + password, stored in Cognito)
- [ ] Functionality: Create, read, update, delete portfolio projects
- [ ] Data stored in: DynamoDB (Projects table)
- [ ] Backend API: Uses POST/PUT/DELETE /api/projects endpoints

---

## Admin Login Page

### Route: /admin/login

#### Desktop/Tablet/Mobile Layout
- [ ] Centered card/form
- [ ] Heading: "Admin Login" (28px font size)
- [ ] Email input field
- [ ] Password input field
- [ ] Login button
- [ ] Error message display (if login fails)
- [ ] Loading state: button disabled, spinner or text "Logging in..."

### Tasks

#### AdminLoginPage (src/app/admin/login/page.tsx)
- [ ] Create login page
- [ ] Import and render: LoginForm component
- [ ] Redirect to /admin if already authenticated
- [ ] Background: dark
- [ ] Center form on screen

#### LoginForm Component
- [ ] Create `src/components/admin/LoginForm.tsx`
- [ ] Props: none
- [ ] State:
  - [ ] `email: string`
  - [ ] `password: string`
  - [ ] `isLoading: boolean`
  - [ ] `error: string | null`
- [ ] Fields:
  - [ ] Email input (type="email")
  - [ ] Password input (type="password")
  - [ ] Login button
- [ ] On submit:
  - [ ] Validate inputs (required, email format)
  - [ ] Call POST /api/auth/login
  - [ ] On success: store tokens (localStorage or cookies), redirect to /admin
  - [ ] On error: display error message
- [ ] Styling: shadcn/ui form components
- [ ] Responsive: form width 400px desktop, full width mobile

---

## Admin Dashboard Page

### Route: /admin

#### Features
- [ ] Protected route (requires auth token)
- [ ] Heading: "Admin Dashboard"
- [ ] Two main sections:
  - [ ] ProjectForm (add new project or edit existing)
  - [ ] ProjectList (view all projects, edit/delete buttons)
- [ ] Logout button (top right)

#### Desktop/Tablet Layout (768px and up)
- [ ] Two-column layout:
  - [ ] Left: ProjectForm (40% width)
  - [ ] Right: ProjectList (60% width)
- [ ] Logout button: top right corner

#### Mobile Layout (375px - 767px)
- [ ] Single column layout:
  - [ ] ProjectForm (full width)
  - [ ] ProjectList (full width, below form)
- [ ] Logout button: top right corner

### Tasks

#### AdminPage (src/app/admin/page.tsx)
- [ ] Create admin dashboard page
- [ ] Redirect to /admin/login if not authenticated
- [ ] Import and render:
  - [ ] Heading: "Admin Dashboard"
  - [ ] Logout button
  - [ ] ProjectForm component
  - [ ] ProjectList component
- [ ] Layout: two-column (desktop), stacked (mobile)
- [ ] Fetch initial projects: call GET /api/projects on page load
- [ ] Pass projects to ProjectList
- [ ] Background: dark
- [ ] Responsive: layout adjusts for screen size

#### AdminLayout (src/app/admin/layout.tsx)
- [ ] Wrapper for all /admin routes
- [ ] Render: AdminAuthGuard (protects routes)
- [ ] If not authenticated: redirects to /admin/login
- [ ] Otherwise: renders child pages

---

## Admin Components

### AdminAuthGuard Component

#### Purpose
Protect /admin routes. If user not authenticated, redirect to /admin/login.

#### Tasks

- [ ] Create `src/components/admin/AdminAuthGuard.tsx`
- [ ] Props: `children: ReactNode`
- [ ] On mount:
  - [ ] Check if access token exists (localStorage or cookies)
  - [ ] If yes: render children
  - [ ] If no: redirect to /admin/login
- [ ] Optionally: validate token with backend (call /api/auth/validate or similar)
- [ ] Show loading state while checking auth

---

### ProjectForm Component

#### Purpose
Form to create a new project or edit an existing project.

#### Tasks

- [ ] Create `src/components/admin/ProjectForm.tsx`
- [ ] Props:
  - [ ] `project?: Project` (if editing; undefined if creating)
  - [ ] `onSubmit: (project: Project) => void` (callback when form submitted)
- [ ] State:
  - [ ] `title: string`
  - [ ] `description: string`
  - [ ] `longDescription: string`
  - [ ] `techStack: string[]` (array of tech names)
  - [ ] `demoLink: string` (optional)
  - [ ] `githubLink: string` (required)
  - [ ] `caseStudyLink: string` (optional)
  - [ ] `status: string` ("live", "coming-soon", "in-progress")
  - [ ] `featured: boolean`
  - [ ] `isLoading: boolean`
  - [ ] `error: string | null`
- [ ] Fields:
  - [ ] Title (required, text input)
  - [ ] Description (required, text input)
  - [ ] Long Description (required, textarea)
  - [ ] Tech Stack (multiselect or comma-separated tags)
  - [ ] Demo Link (optional, text input)
  - [ ] GitHub Link (required, text input)
  - [ ] Case Study Link (optional, text input)
  - [ ] Status (dropdown: "live", "coming-soon", "in-progress")
  - [ ] Featured (checkbox, true/false)
  - [ ] Submit button (text: "Create Project" or "Update Project")
- [ ] Validation:
  - [ ] Required fields: title, description, longDescription, githubLink
  - [ ] GitHub link must be valid URL
  - [ ] Other links (if provided) must be valid URLs
- [ ] On submit:
  - [ ] Validate all fields
  - [ ] If creating: call POST /api/projects
  - [ ] If editing: call PUT /api/projects/:id
  - [ ] On success: reset form (if creating) or close form (if editing), call onSubmit callback
  - [ ] On error: display error message
- [ ] Styling: shadcn/ui form components
- [ ] Responsive: full width on all screen sizes

---

### ProjectList Component

#### Purpose
Display all projects in a table/list format. Allow editing and deleting.

#### Tasks

- [ ] Create `src/components/admin/ProjectList.tsx`
- [ ] Props:
  - [ ] `projects: Project[]`
  - [ ] `onEdit: (project: Project) => void` (callback when edit clicked)
  - [ ] `onDelete: (projectId: string) => void` (callback when delete clicked)
- [ ] Display:
  - [ ] Table format (desktop) or card list (mobile)
  - [ ] Columns/fields: Title, Status, Featured, Actions
  - [ ] Actions: Edit button, Delete button
- [ ] On Edit button click:
  - [ ] Call onEdit callback with project
  - [ ] (Parent component handles opening form or navigating)
- [ ] On Delete button click:
  - [ ] Show confirmation dialog ("Are you sure?")
  - [ ] If confirmed: call DELETE /api/projects/:id
  - [ ] On success: remove project from list
  - [ ] On error: show error message
- [ ] Loading state: button disabled while deleting
- [ ] Responsive:
  - [ ] Desktop (1024px+): table format
  - [ ] Tablet/Mobile: card list (1 project per card, buttons stacked)
- [ ] Empty state: "No projects yet. Add one using the form above."

---

## Authentication Flow (Phase 2)

### Login Flow
1. User navigates to /admin/login
2. User enters email + password
3. Click login
4. Frontend calls POST /api/auth/login (Lambda endpoint)
5. Backend returns: accessToken, refreshToken, expiresIn
6. Frontend stores tokens in localStorage or secure cookies
7. Frontend redirects to /admin
8. /admin page checks for token; if exists, renders dashboard

### Session Management
- [ ] Access token: short-lived (15 minutes)
- [ ] Refresh token: long-lived (30 days)
- [ ] On API error 401: frontend calls POST /api/auth/refresh to get new access token
- [ ] Retry original request with new token

### Logout Flow
1. User clicks logout button
2. Frontend calls POST /api/auth/logout (with access token)
3. Backend invalidates token in Cognito
4. Frontend clears stored tokens
5. Frontend redirects to home

---

## API Integration

### Endpoints Used (all from API.md)

#### Projects (Read/Write)
- [ ] GET /api/projects — Fetch all projects
- [ ] GET /api/projects/:id — Fetch single project
- [ ] POST /api/projects — Create project (admin only)
- [ ] PUT /api/projects/:id — Update project (admin only)
- [ ] DELETE /api/projects/:id — Delete project (admin only)

#### Authentication
- [ ] POST /api/auth/login — Login
- [ ] POST /api/auth/logout — Logout
- [ ] POST /api/auth/refresh — Refresh access token

---

## Shared Admin Utilities

### useAuth Hook
- [ ] Create `src/hooks/useAuth.ts`
- [ ] Returns:
  - [ ] `isAuthenticated: boolean`
  - [ ] `user: User | null`
  - [ ] `accessToken: string | null`
  - [ ] `login: (email, password) => Promise<void>`
  - [ ] `logout: () => Promise<void>`
- [ ] Manages token storage and retrieval
- [ ] Handles token refresh automatically

### useProjects Hook
- [ ] Create `src/hooks/useProjects.ts` (Phase 2)
- [ ] Returns:
  - [ ] `projects: Project[]`
  - [ ] `isLoading: boolean`
  - [ ] `error: string | null`
  - [ ] `fetchProjects: () => Promise<void>`
  - [ ] `createProject: (project) => Promise<void>`
  - [ ] `updateProject: (id, project) => Promise<void>`
  - [ ] `deleteProject: (id) => Promise<void>`
- [ ] Manages API calls to projects endpoints
- [ ] Caches projects locally

---

## Design Notes
- [ ] No fancy styling Phase 2; functional is fine
- [ ] Admin panel is for you only; prioritize usability over beauty
- [ ] Dark background: same as public site
- [ ] Form inputs: use shadcn/ui components for consistency
