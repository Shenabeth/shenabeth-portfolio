# Roadmap

Planned work, in rough priority order. This is forward-looking only — for how the site works
today, see [ARCHITECTURE.md](ARCHITECTURE.md).


## Admin panel

The groundwork is in place: project pages are generated from the `CaseStudy` template in
`src/config/case-studies.ts`, and `/admin` already renders the project list plus a
template-shaped "new project" form (`src/components/admin/AdminProjectForm.tsx`). What's left:

- **Authentication** for `/admin` and `/admin/login` (currently UI only). Decide on the auth
  mechanism and guard the routes.
- **Storage** so created projects persist. Today projects live in a config file; the admin
  flow needs somewhere to write new `CaseStudy` entries (a data store, or a commit-based
  workflow) and have `/projects/[slug]` pick them up.
- **Create / edit / delete** wired to that storage, with image upload for project/cert assets.

The intent is unchanged from the current design: an admin fills in the case-study template and
a new project page is produced — no code change per project.

