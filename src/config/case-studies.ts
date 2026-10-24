/*
 * File: case-studies.ts
 * Purpose: Case-study content, keyed by project slug. Each entry declares only
 *          the sections it wants, so the dynamic /projects/[slug] page renders a
 *          different shape per project (e.g. only the Portfolio Site has an
 *          Impact section today). This config is the "template" a future admin
 *          panel would write to when adding a new project page.
 *
 *          Content guideline: keep everything here factually accurate. Describe
 *          only what is actually built. Planned work is labeled as planned.
 */

import { TechGroup } from '@/components/case-study/TechStackSection';
import { ProblemColumn } from '@/components/case-study/ProblemSection';
import { ImpactStat } from '@/components/case-study/ImpactSection';
import { FeatureItem } from '@/components/case-study/FeaturesSection';
import { LanguageSlice } from '@/components/case-study/LanguageBar';
import { OverviewItem } from '@/components/case-study/OverviewSection';
import { ShowcaseItem } from '@/components/case-study/ShowcaseSection';
import { GalleryItem } from '@/components/case-study/GallerySection';
import { RoleItem } from '@/components/case-study/RolesSection';
import { ControlItem } from '@/components/case-study/ControlsSection';
import { PdfDoc } from '@/components/case-study/PdfSection';
import { ArchitectureContent } from '@/components/case-study/ArchitectureSection';
import { PlayableDemo } from '@/components/case-study/PlayDemoSection';

/** An external action shown under the summary (live demo, source, etc.). */
export interface CaseStudyLink {
  label: string;
  href: string;
  /** Visual weight: the first/primary link is filled, the rest outlined. */
  primary?: boolean;
}

export interface CaseStudy {
  slug: string;
  title: string;
  summary: string;
  /** Live demo / source links shown as buttons under the summary. */
  links?: CaseStudyLink[];
  /**
   * A prominent call-out for a playable or runnable build. The banner link
   * scrolls away on a long page; this gives the demo its own block.
   */
  playable?: PlayableDemo;
  /**
   * Architecture diagrams. Two stages render as "considered → shipped" so
   * the page can show how a design changed, not just where it landed.
   */
  architecture?: ArchitectureContent;
  /** GitHub-style language breakdown shown at the top of the tech stack. */
  languages: LanguageSlice[];
  techStack: TechGroup[];
  /** "At a glance" fact tiles (genre, tools, role, team size, …). */
  overview?: OverviewItem[];
  problem?: { before: ProblemColumn; after: ProblemColumn };
  impact?: ImpactStat[];
  features?: FeatureItem[];
  /** Figure cards walking through the distinct pieces of the project. */
  showcase?: { title?: string; description?: string; items: ShowcaseItem[] };
  /** Captioned image grid for process shots / wireframes. */
  gallery?: { title?: string; description?: string; items: GalleryItem[] };
  /** Team credits for a collaborative project. */
  roles?: RoleItem[];
  /** Key → action control legend for a game or interactive tool. */
  controls?: ControlItem[];
  /** An embedded PDF (paper / report / write-up) previewed inline on the page. */
  document?: PdfDoc;
  lessons?: string[];
}

// Canonical GitHub language colors, so the language bar reads as authentic.
const LANG_COLOR = {
  python: '#3572a5',
  jupyter: '#da5b0b',
  typescript: '#3178c6',
  javascript: '#f1e05a',
  css: '#563d7c',
  html: '#e34c26',
  plpgsql: '#336790',
  csharp: '#178600',
  /* GitHub's own ShaderLab color (#222c37) is a near-black slate that
     disappears against this site's dark surfaces, so the bar segment and its
     legend dot both read as empty. Lightened to a legible steel blue that
     still stays in ShaderLab's hue family. */
  shaderlab: '#6f8fae',
  hlsl: '#aace60',
} as const;

export const CASE_STUDIES: Record<string, CaseStudy> = {
  'portfolio-site': {
    slug: 'portfolio-site',
    title: 'Portfolio Site',
    summary:
      'The first version of this portfolio was a hand-coded HTML, CSS, and Bootstrap site hosted for free on GitHub Pages. It worked, but every page had its own copy of the same markup, so the smallest change meant editing the same thing in several files. The rebuild is a modular Next.js app on AWS Amplify: one set of reusable components, project pages generated from a single template, and a deploy pipeline that is fully understood end to end.',
    links: [
      { label: 'Live Demo', href: '/', primary: true },
      { label: 'View Source', href: 'https://github.com/Shenabeth/shenabeth-portfolio' },
    ],
    /*
     * Architecture diagrams live in /public/projects/portfolio-site/ as
     * architecture-old.svg and architecture-new.svg. Clicking a frame opens
     * a zoomable lightbox. The two stages render side by side with no arrow:
     * the shipped stage carries a green border to mark it as the one that
     * was used.
     */
    architecture: {
      intro:
        'This site was first planned as a serverless backend: files in S3 behind CloudFront, with Lambda, API Gateway, and DynamoDB behind them for the contact form and project data. That design works, but it is a lot of separate pieces to set up and keep healthy. Amplify replaces all of it with one fully managed service that builds, deploys, and serves the site on its own, for the same result a visitor sees and far less to maintain.',
      stages: [
        {
          label: '// considered',
          title: 'The Old Plan',
          image: '/projects/portfolio-site/architecture-old.svg',
          caption:
            'A serverless backend: static files in S3 behind CloudFront, with API Gateway routing to Lambda functions and both project content and contact submissions in DynamoDB. Every piece is set up and monitored separately, which is more than a site with no real backend work needs.',
        },
        {
          label: '// shipped',
          title: 'The New Plan',
          image: '/projects/portfolio-site/architecture-new.svg',
          caption:
            'One fully managed service. Amplify builds and serves the Next.js app, pulling from GitHub on every push to main. Route 53 handles DNS for the custom domain, and an AWS Budget plus a CloudWatch billing alarm watch the spend. Hosting lands around 60 cents a month.',
        },
      ],
      note:
        'The old plan needed five services wired together and watched (S3, CloudFront, API Gateway, Lambda, DynamoDB). The new plan runs on Amplify, one fully managed service that builds, deploys, and hosts the site, with Route 53 for the domain and Amazon CloudWatch keeping an eye on the bill. Same result for a visitor, far less to maintain.',
    },
    languages: [
      { name: 'TypeScript', percent: 96.8, color: LANG_COLOR.typescript },
      { name: 'CSS', percent: 2.7, color: LANG_COLOR.css },
      { name: 'JavaScript', percent: 0.5, color: LANG_COLOR.javascript },
    ],
    techStack: [
      {
        label: 'Framework',
        items: ['Next.js 16', 'React 19', 'TypeScript'],
      },
      {
        label: 'Styling & Motion',
        items: ['Tailwind CSS', 'Framer Motion', 'shadcn/ui'],
      },
      {
        label: 'Hosting & Ops',
        items: ['AWS Amplify', 'Amazon CloudWatch', 'Route 53', 'Ionos'],
      },
      {
        label: 'Tooling',
        items: ['Git', 'GitHub', 'Figma', 'Lucidchart'],
      },
    ],
    problem: {
      before: {
        label: '// before',
        heading: 'A hand-coded static site',
        points: [
          'Plain HTML with CSS and Bootstrap, hosted free on GitHub Pages',
          'Nothing was reusable. The nav, footer, and cards were copied into every page, so one change meant editing the same markup in several files',
          'Styling was global and hard to keep consistent as pages were added',
        ],
      },
      after: {
        label: '// after',
        heading: 'A modular Next.js app',
        points: [
          'Every section is a typed, reusable React component, so a change lands in one place',
          'Project pages are generated from a single template fed by a config file, so adding a project means adding content, not building a page',
          'Colors, fonts, and spacing are defined once and reused everywhere, so the whole site stays consistent',
          'Deployed on AWS Amplify with automatic builds on each push to main, served on a custom domain through Route 53',
        ],
      },
    },
    impact: [
      {
        value: '~$0.60',
        label: 'Projected hosting / month',
        description:
          'Amplify hosting plus the Route 53 domain run about 60 cents a month, tracked with an AWS Budget and a billing alarm.',
      },
      {
        value: '5 projects',
        label: 'One template behind each',
        description:
          'Every project page on the site runs on the same template, so a new one is new content in a config file, not a new page to build.',
      },
      {
        value: '0 steps',
        label: 'No deploy work',
        description:
          'A push to GitHub triggers the full build and release on Amplify. The hosting takes no hands-on work after that.',
      },
    ],
    features: [
      {
        title: 'Template-driven project pages',
        body: 'Every project page is built from the same set of section cards: tech stack, before and after, impact, features, and lessons. Adding a project today means writing its content in one config file instead of building a new page. A planned login through Amazon Cognito will take that one step further, so new project pages can be created right from the site without any code changes.',
      },
      {
        title: 'One component system',
        body: 'Buttons, headings, badges, and section layouts are shared components reused across the home, about, and project pages, so the whole site stays visually consistent.',
      },
      {
        title: 'Continuous deployment on Amplify',
        body: 'A push to main triggers an Amplify build that compiles the Next.js app and publishes it. Same model as the old GitHub Pages site, with full control over the pipeline.',
      },
      {
        title: 'Cost monitoring from day one',
        body: 'An AWS Budget and a CloudWatch billing alarm watch the account so there are no surprises, which is useful practice for the Solutions Architect work this project supports.',
      },
    ],
    lessons: [
      'Splitting the site into reusable section cards before building anything was what made every page fast and easy to put together.',
      'Running all of the project pages off of one template means a new project is mostly just writing its content, instead of more code editing work in the codebase.',
      'The fully-managed Amplify setup was easier than expected, so the larger serverless plan was not worth the extra pieces to maintain.',
      'A budget and a billing alarm set up on day one are the cheapest way to avoid a surprise AWS charge.',
    ],
  },

  'sai-system': {
    slug: 'sai-system',
    title: 'SAI System',
    summary:
      'SAI System combines AI-powered learning with a playable dungeon-crawler RPG. Users bring their own AI service credentials, pick from a roster of specialized AI assistants, and chat — or they can enter a 3D dungeon that the game builds fresh every time, where every puzzle they solve to progress is a real computer science concept in disguise. The project started as a DIY home-improvement chatbot and evolved into an ambitious learning platform that proves AI doesn\'t have to be a passive text box — it can be a world you explore.',
    links: [
      { label: 'Live Demo', href: 'https://sai-system.vercel.app/', primary: true },
    ],
    languages: [
      { name: 'TypeScript', percent: 94.0, color: LANG_COLOR.typescript },
      { name: 'CSS', percent: 4.5, color: LANG_COLOR.css },
      { name: 'JavaScript', percent: 1.5, color: LANG_COLOR.javascript },
    ],
    overview: [
      { label: 'Type', value: 'AI learning platform + dungeon-crawler RPG' },
      { label: 'Focus', value: 'Interactive CS education through gamification' },
      { label: 'Hosting', value: 'Vercel (frontend), AWS (backend)' },
      { label: 'Status', value: 'Active development — dungeon playable, AWS migration in progress' },
    ],
    techStack: [
      {
        label: 'Framework',
        items: ['Next.js 15', 'React 19', 'TypeScript'],
      },
      {
        label: 'Styling & Motion',
        items: ['Tailwind CSS', 'Framer Motion', 'WCAG AA+ accessible'],
      },
      {
        label: '3D Game Engine',
        items: ['React Three Fiber', 'Three.js', 'Zustand'],
      },
      {
        label: 'Backend & Security',
        items: ['AWS Cognito', 'DynamoDB', 'Web Crypto API', 'Vercel'],
      },
      {
        label: 'AI',
        items: ['Bring-your-own-key', 'Markdown instruction sets', 'Per-agent prompting'],
      },
    ],
    showcase: {
      title: 'Core Systems',
      description:
        'The platform is built around four interlocking systems — a procedural dungeon, a living hub world, a specialized agent roster, and a bring-your-own-key model that keeps AI costs at zero.',
      items: [
        {
          title: 'Procedural 3D Dungeon',
          body: 'Every expedition generates a completely new layout from a random seed. The generator carves rooms, connects them with corridors, and places enemies, items, and objectives — then automatically verifies the floor is completable. Five floors of increasing difficulty, each tied to a real CS topic dressed up in sci-fi framing. Fog of war, tile-based movement, and turn-based combat play out in a fully rendered 3D scene.',
        },
        {
          title: 'The Hub World',
          body: 'Between dungeon runs, players explore a 3D town plaza with free-roam movement. A market, quest board, schoolhouse, player home, and expedition gate each open a different game panel. Resident NPCs, animated scenery, and a day/night cycle make the space feel lived-in.',
        },
        {
          title: 'Specialized Agent Roster',
          body: 'Nine agents — Structural, Materials, Outdoor, Indoor, Safety & Code, Research, Strategist, Devil\'s Advocate, and a General fallback — each defined by Markdown instructions. The system scans each message for signal words and routes it to the best match. Strategist and Devil\'s Advocate serve as "council anchors" that can join any conversation.',
        },
        {
          title: 'AI-Generated Challenges',
          body: 'In assisted mode, the player\'s own AI generates brand-new puzzles for each floor. The AI writes the content; grading is always handled by the app\'s own code. If the AI fails entirely, a pre-written puzzle swaps in seamlessly so the run is never interrupted — infinite variety with zero risk to fairness.',
        },
      ],
    },
    features: [
      {
        title: 'Bring your own key',
        body: 'Users plug in their own API key from any supported provider (OpenAI, Gemini, etc.). Zero platform cost, full user control over provider and spending, and keys are encrypted on the user\'s device with Web Crypto (PBKDF2 + AES-GCM) before they\'re ever stored.',
      },
      {
        title: 'Backend-agnostic architecture',
        body: 'The UI talks to a generic backend contract — "sign in," "save a key," "load conversations" — not to any specific service. Behind it, adapters translate to whichever backend is configured. A local adapter handles guest mode, an AWS adapter handles production, and the app picks which to use on startup.',
      },
      {
        title: 'Guest mode',
        body: 'When no cloud backend is detected, the app automatically opens a local guest session so every page is fully browsable. Reviewers and visitors can explore the entire app without creating an account.',
      },
      {
        title: 'Tech Chef Academy',
        body: 'A recipe-themed mini-game inside the dashboard: match tech terms to definitions, then order steps or sort items into categories. Completed recipes earn stars, XP, and rank-ups — a lighter, more structured learning path outside the dungeon.',
      },
    ],
    lessons: [
      'Starting with a backend contract instead of an implementation meant the entire frontend could be built, tested, and deployed using browser storage. When it came time to wire up the real cloud services, the work was filling in pre-defined operations, not rearchitecting the app.',
      'The AI challenge system is designed around the assumption that the AI will sometimes break — wrong format, slow response, nonsense output. Every failure mode has a fallback, and the AI is treated as a content generator rather than a game engine: it makes things fresh, but it\'s never load-bearing.',
      'All game rules — movement, combat, puzzles, turn order — live in one central store. The 3D scene only reads that store and draws what it says. The entire game could be built and tested without rendering a single 3D frame, and a visual bug can never corrupt the player\'s save.',
      'Wrapping CS concepts in flashcards gets boring fast. Building a dungeon with real combat, inventory, quests, and progression — where solving a puzzle is the only way to advance — made the learning feel like part of the adventure rather than an interruption of it.',
    ],
  },

  // Dog Game image assets live in /public/projects/dog-game/. Showcase cards
  // carry the asset renders (turret.png, spike-trap.png, …) and the gallery
  // carries the in-engine test captures and UI shots. Any item whose `image`
  // is omitted renders a clean captioned frame instead.
  'dog-game': {
    slug: 'dog-game',
    title: 'Dog Game',
    summary:
      '**What\'s the Dog Doing?** is a 3D tower-defense game where you play as Doge, a post-apocalyptic dog defending the last skyscraper of his owner\'s world from endless waves of cats. You explore the map, collect bones, and place turrets and traps to hold the line as each wave gets harder.',
    links: [
      { label: 'Play The Game', href: 'https://dog-game-demo.vercel.app/', primary: true },
    ],
    /*
     * The demo also gets its own block partway down the page. The banner
     * button above is the first thing on the page, but it scrolls out of
     * reach immediately on a write-up this long, and a reader who decides
     * to try the game after reading about it shouldn\'t have to scroll back.
     */
    playable: {
      href: 'https://dog-game-demo.vercel.app/',
      label: 'Play The Demo',
      copy: 'The WebGL build runs in the browser — no install, no Unity, no download. Move Doge around the map, collect bones, and place turrets before the next wave of cats arrives. The game is unfinished, so expect rough edges, but the core loop is all there and playable. The full control legend is right below this block.',
      /* No "Controls" row here: the Controls section now sits directly under
         this block, so these notes cover what the legend doesn\'t. */
      notes: [
        { label: 'Platform', value: 'Browser (WebGL) — desktop recommended' },
        { label: 'Built with', value: 'Unity · C# · Blender' },
        { label: 'Build state', value: 'Playable prototype, not a finished game' },
      ],
    },
    languages: [
      { name: 'C#', percent: 61.8, color: LANG_COLOR.csharp },
      { name: 'ShaderLab', percent: 19.0, color: LANG_COLOR.shaderlab },
      { name: 'HTML', percent: 15.9, color: LANG_COLOR.html },
      { name: 'HLSL', percent: 3.3, color: LANG_COLOR.hlsl },
    ],
    overview: [
      { label: 'Genre', value: '3D Tower Defense (open world)' },
      { label: 'Tools', value: 'Unity, C#, Blender, Photoshop' },
      { label: 'My Role', value: 'Team Leader · Sound, Asset & UX Design' },
      { label: 'Team', value: '5 people' },
    ],
    techStack: [
      {
        label: 'Engine & Code',
        items: ['Unity', 'C#', 'Shaders (HLSL)'],
      },
      {
        label: 'Art & Audio',
        items: ['Blender', 'Photoshop', 'Sound Design'],
      },
      {
        label: 'Design & Delivery',
        items: ['Game Design', 'UX', 'Playtesting', 'WebGL'],
      },
    ],
    roles: [
      {
        role: 'Shenabeth — Team Leader, Sound, Asset & UX Design',
        contribution:
          'Coordinated assignments and built front-end systems: Doge\'s movement, player interactions, UI, and sound. Created sounds, assets, and UI elements, and helped guide the team\'s design choices and overall aesthetic.',
        isMe: true,
      },
      {
        role: 'Combat System Designer',
        contribution: 'Implemented enemy waves, AI behavior, and the player\'s weapons.',
      },
      {
        role: 'Inventory Mechanics',
        contribution: 'Built the inventory system, the shop, and item management.',
      },
      {
        role: 'Terrain Designer',
        contribution: 'Designed the map, textures, and environment assets.',
      },
      {
        role: 'Version Control & Floating Support',
        contribution:
          'Owned the Git repository — branches, merges, and resolving the conflicts that came with five people working in one Unity project. Floated between the other roles as needed, picking up whatever was behind and helping each of us land our systems in the build.',
      },
    ],
    controls: [
      { keys: 'WASD / Arrows', action: 'Move around the map' },
      { keys: 'Shift', action: 'Run' },
      { keys: 'Space', action: 'Jump' },
      { keys: '1 – 6', action: 'Select an inventory item' },
      { keys: 'E', action: 'Place the selected item' },
      { keys: 'B', action: 'Bark — temporarily disables nearby enemies' },
      { keys: 'Esc', action: 'Quit' },
    ],
    showcase: {
      title: 'Defense Systems & Mechanics',
      description:
        'Players survive escalating waves of cats by collecting bones, buying items from the shop, and placing turrets and traps around the map. Each defense plays differently, so placement and timing matter.',
      items: [
        {
          title: 'Turrets',
          body: 'The core defense: automated enemy tracking with projectile attacks and impact effects. Placement, range, and coverage all matter, so players think tactically about where each one goes.',
          image: '/projects/dog-game/turret.png',
          caption: 'Figure 1. The turret model, built in Blender.',
        },
        {
          title: 'Spike Trap',
          body: 'Passive area control that damages any enemy crossing it. Pairs well with active weapons, letting players combine traps and turrets for crowd management.',
          image: '/projects/dog-game/spike-trap.png',
          caption: 'Figure 2. The spike trap, with its Doge-marked pressure plate.',
        },
        {
          title: 'Cannon',
          body: 'Heavy artillery for tougher enemies: slow, high-impact shots with big explosion effects that reward good timing and target selection.',
          image: '/projects/dog-game/cannon.png',
          caption: 'Figure 3. The cannon model.',
        },
        {
          title: 'Pea Shooter',
          body: 'A lightweight, rapid-fire unit for swarms. Cheap and fast, it\'s ideal for early-game defense and keeping steady pressure across waves.',
          image: '/projects/dog-game/pea-shooter.png',
          caption: 'Figure 4. The pea shooter model.',
        },
        {
          title: 'The Bomb',
          body: 'High-impact, localized damage for clustered enemies, rewarding precise timing and smart placement.',
          image: '/projects/dog-game/bomb-test.png',
          caption: 'Figure 5. The bomb item sprite.',
        },
        {
          title: 'Enemy Design',
          body: 'Cats advance with varied movement patterns and death effects, and drop bones when defeated — feeding the economy loop of earning, upgrading, and defending.',
          image: '/projects/dog-game/enemy.png',
          caption: 'Figure 6. The enemy cat, placed in the Unity scene.',
        },
      ],
    },
    features: [
      {
        title: 'Physics-based targeting',
        body: 'Turret tracking and explosions use physics-based detection so hits and area damage land where they should.',
      },
      {
        title: 'Accurate collisions',
        body: 'Layer masks keep collision and damage handling precise, so each defense only affects what it should.',
      },
      {
        title: 'Bark crowd control',
        body: 'Doge\'s bark temporarily disables nearby enemies, giving players an active ability to buy time in a tight spot.',
      },
      {
        title: 'Interactive shop & inventory',
        body: 'The shop and inventory are fully interactive, designed so players can quickly browse, select, and place items mid-fight.',
      },
    ],
    gallery: {
      title: 'Process & UI',
      description:
        'Concepting, wireframes, and the systems we built along the way. I handled much of the UI and asset work on the team.',
      items: [
        {
          image: '/projects/dog-game/turret-test.gif',
          caption: 'Figure 7. Testing turret placement and damage.',
        },
        {
          image: '/projects/dog-game/spike-trap-test.gif',
          caption: 'Figure 8. Testing the spike trap on enemies.',
        },
        {
          image: '/projects/dog-game/cannon-wireframe.png',
          caption: 'Figure 9. The team\'s first cannon wireframe.',
        },
        {
          image: '/projects/dog-game/cannon-test.gif',
          caption: 'Figure 10. Testing a turret, spike trap, and finally the cannon.',
        },
        {
          image: '/projects/dog-game/pea-shooter-test.gif',
          caption: 'Figure 11. Early testing of the pea shooter.',
        },
        {
          image: '/projects/dog-game/bomb.gif',
          caption: 'Figure 12. Early testing of the bomb.',
        },
        {
          image: '/projects/dog-game/enemy-waves-test.gif',
          caption: 'Figure 13. Testing how enemy waves play out.',
        },
        {
          image: '/projects/dog-game/shop.gif',
          caption: 'Figure 14. The shop, for buying defense items.',
        },
        {
          image: '/projects/dog-game/bullets.png',
          caption: 'Figure 15. Custom bullets with Doge-face detailing.',
        },
        {
          image: '/projects/dog-game/mvp.png',
          caption: 'Figure 16. The final prototype MVP, with the wave counter, bone count, and item bar.',
        },
      ],
    },
    lessons: [
      'Version control held the project together. Five people building separate systems in one Unity project broke the main build often, and careful branching and merging was what kept the pieces fitting.',
      'The economy started out of balance. Cats killed the player faster than bones came in, so the difficulty had to drop a lot before anyone could afford a defense. The demo is still too hard, and easing it further is the first fix.',
      'Iterative playtesting is what tuned wave pacing and difficulty into a curve that challenges without frustrating.',
      'Small touches like custom Doge-face bullets are invisible in motion, but they\'re the polish that makes a game feel cared for.',
    ],
  },

  // Panoramic Stitching — image assets (if added) go in
  // /public/projects/panoramic-stitching/. Each showcase and gallery item has
  // an optional `image` field: drop a screenshot in and set the path. Until
  // then the cards render clean captioned frames, so the page is complete
  // without the images.
  'panoramic-stitching': {
    slug: 'panoramic-stitching',
    title: 'Panoramic Stitching',
    summary:
      'A computer-vision pipeline that transforms a set of overlapping photos into a single unified panoramic scene. It detects distinctive features in each image, matches the ones that overlap between neighbors, solves for the transform that aligns them, and warps the images together into one seamless wide shot — the same core idea behind the panorama mode on a phone, built from the ground up in Python.',
    links: [
      {
        label: 'View Project',
        href: 'https://sites.google.com/view/shenabeth/computer-vision-panoramic-stitching?authuser=0',
        primary: true,
      },
    ],
    languages: [
      { name: 'Python', percent: 100, color: LANG_COLOR.python },
    ],
    overview: [
      { label: 'Field', value: 'Computer Vision' },
      { label: 'Focus', value: 'Feature matching & image warping' },
      { label: 'Tools', value: 'Python, NumPy, OpenCV' },
      { label: 'Type', value: 'Image-processing pipeline' },
    ],
    techStack: [
      {
        label: 'Language',
        items: ['Python'],
      },
      {
        label: 'Libraries',
        items: ['NumPy', 'OpenCV'],
      },
      {
        label: 'Techniques',
        items: ['Feature detection', 'Feature matching', 'Homography', 'Image warping & blending'],
      },
    ],
    showcase: {
      title: 'How the Pipeline Works',
      description:
        'Each stage takes the raw images a step closer to one continuous scene. The figures below walk through the pipeline — drop in a screenshot for any stage to illustrate it.',
      items: [
        {
          title: 'Feature detection',
          body: 'Each image is scanned for distinctive, repeatable keypoints — corners and textured spots that can be recognized again from a slightly different angle.',
          caption: 'Figure 1. Detected keypoints on a source image.',
        },
        {
          title: 'Feature matching',
          body: 'Keypoints in overlapping images are compared and paired up, so the pipeline knows which points in one photo correspond to the same real-world point in the next.',
          caption: 'Figure 2. Matched correspondences between two images.',
        },
        {
          title: 'Alignment & warping',
          body: 'From the matches, the pipeline solves for the transform that maps one image onto its neighbor, then warps the images into a shared coordinate frame so they line up.',
          caption: 'Figure 3. Images warped into a common frame.',
        },
        {
          title: 'The final panorama',
          body: 'The aligned images are composited and blended into a single wide scene, with the seams between them smoothed so the result reads as one photo.',
          caption: 'Figure 4. The stitched panorama.',
        },
      ],
    },
    lessons: [
      'Good matches matter more than many matches — filtering out bad correspondences is what keeps the alignment from drifting.',
      'A panorama is only as seamless as its blending; the geometry can be perfect and a hard seam will still give it away.',
      'Building the pipeline stage by stage made it clear how much classic computer vision rides on a few well-chosen feature points.',
    ],
  },

  // Depth and Contact Prediction AI — the report PDF goes in
  // /public/projects/depth-contact-ai/ as report.pdf (see `document` below).
  // Image assets, if added, go in the same folder; each showcase/gallery item\'s
  // optional `image` field points at one. The page is complete without them.
  'depth-contact-ai': {
    slug: 'depth-contact-ai',
    title: 'Depth and Contact Prediction AI',
    summary:
      'An AI model that reconstructs contact and 3D shape from the images produced by a tactile sensor. When a soft-touch sensor presses against an object, it captures an image of how its surface deforms; this model learns to read that image and predict two things — where the object is actually touching (the contact area) and the depth, or 3D geometry, of what it pressed against. It turns a picture of a touch into an understanding of the shape behind it.',
    links: [
      {
        label: 'View Project',
        href: 'https://sites.google.com/view/shenabeth/computer-vision-depth-and-contact-ai?authuser=0',
        primary: true,
      },
    ],
    languages: [
      { name: 'Python', percent: 100, color: LANG_COLOR.python },
    ],
    overview: [
      { label: 'Field', value: 'Haptics & Computer Vision' },
      { label: 'Focus', value: 'Contact & depth prediction' },
      { label: 'Tools', value: 'Python, deep learning' },
      { label: 'Type', value: 'Prediction model' },
    ],
    techStack: [
      {
        label: 'Language',
        items: ['Python'],
      },
      {
        label: 'Domain',
        items: ['Tactile sensing', 'Haptics', '3D reconstruction'],
      },
      {
        label: 'Approach',
        items: ['Supervised learning', 'Image-to-map prediction', 'Contact masks', 'Depth maps'],
      },
    ],
    showcase: {
      title: 'What the Model Predicts',
      description:
        'From one tactile sensor image, the model produces two aligned outputs. Drop in a screenshot for either to illustrate it.',
      items: [
        {
          title: 'Contact area',
          body: 'A map of exactly where the object is pressing into the sensor, separating true contact from the parts of the surface that only appear close in the image.',
          caption: 'Figure 1. Predicted contact mask over a sensor image.',
        },
        {
          title: 'Depth & 3D shape',
          body: 'A depth map that recovers the geometry of what was pressed — effectively reconstructing the 3D shape of the object\'s surface from a single touch.',
          caption: 'Figure 2. Predicted depth / height map.',
        },
      ],
    },
    document: {
      file: '/projects/depth-contact-ai/report.pdf',
      title: 'Project report',
      caption:
        'The full write-up — approach, model, and results. Open it in a new tab or download it above, or read it inline.',
    },
    lessons: [
      'Tactile images look nothing like camera images, so the hard part is learning what the sensor\'s deformation patterns actually mean.',
      'Predicting contact and depth together is more honest than either alone — knowing where something touches is what makes the recovered shape trustworthy.',
      'Framing a haptics problem as image-to-map prediction let familiar computer-vision tools do work they were never obviously meant for.',
    ],
  },
};

/**
 * Look up a case study by its project slug.
 *
 * @param slug - Project id / url slug
 * @returns Case study entry or undefined
 */
export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES[slug];
}

/**
 * Return every known case study slug — used by Next\'s generateStaticParams.
 *
 * @returns Array of slug strings
 */
export function getAllCaseStudySlugs(): string[] {
  return Object.keys(CASE_STUDIES);
}
