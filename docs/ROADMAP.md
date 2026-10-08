# Roadmap

Planned work, in rough priority order. This is forward-looking only — for how the site works
today, see [ARCHITECTURE.md](ARCHITECTURE.md).

## Contact form delivery (Amazon SES)

The contact endpoint (`app/api/contact/route.ts`) already validates submissions and has the
SES integration point marked. To finish it:

- Verify a sender identity in Amazon SES and set `SES_FROM_EMAIL` and `SES_TO_EMAIL` in the
  Amplify environment (plus AWS credentials/region).
- Implement the `SendEmailCommand` call with `@aws-sdk/client-ses` where the `TODO` is.
- Once configured, the route sends mail and returns success; until then it returns 503 and the
  UI points visitors at the direct email link.

## Custom domain (Amazon Route 53)

Register/connect a domain through Route 53 and attach it to the Amplify app. Until then the
site is served on its Amplify-provided URL. (Nothing in the code hard-codes a domain, so this
is a hosting-side change.)

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

## Nice-to-haves

- Project case-study content for SAI System and Dog Game (both currently have short write-ups).
- Gameplay footage/screenshots for the Dog Game page.
- Analytics.
