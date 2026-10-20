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
  shaderlab: '#222c37',
  hlsl: '#aace60',
} as const;

export const CASE_STUDIES: Record<string, CaseStudy> = {
  'portfolio-site': {
    slug: 'portfolio-site',
    title: 'Portfolio Site',
    summary:
      'My first portfolio was a hand-coded HTML, CSS, and Bootstrap site hosted for free on GitHub Pages. It worked, but every page had its own copy of the same markup, so the smallest change meant editing the same thing in several files. I rebuilt it as a modular Next.js app on AWS Amplify — one set of reusable components, project pages generated from a single template, and a deploy pipeline I run and understand end to end.',
    links: [
      { label: 'Live Demo', href: '/', primary: true },
      { label: 'View Source', href: 'https://github.com/Shenabeth/shenabeth-portfolio' },
    ],
    /*
     * Architecture diagrams. Drop the images in
     * /public/projects/portfolio-site/ as architecture-considered.png and
     * architecture-shipped.png and set the `image` fields below — until
     * then each frame renders a placeholder at the same size, so the
     * section is complete and nothing shifts when the art arrives.
     */
    architecture: {
      intro:
        'I planned this site as a serverless application before I built it as a static one. The first design put the pages in S3 behind CloudFront, with Lambda functions and a DynamoDB table standing behind an API Gateway for the contact form and project data. It would have worked, and it would have been a better portfolio piece on paper. It was also more AWS than the problem needed: a handful of Lambdas, a table, and an API to keep patched and monitored, for a site whose content changes when I edit a TypeScript file. I moved to Amplify instead — the cost and the operational surface both dropped to near nothing, and the deploy story got simpler without the site losing anything a visitor can see.',
      stages: [
        {
          label: '// considered',
          title: 'Serverless on S3, Lambda, and DynamoDB',
          caption:
            'Static assets in S3 behind CloudFront, with API Gateway routing to Lambda functions and project content plus contact submissions in DynamoDB. Rejected before implementation: the per-service cost and the number of moving pieces to manage were not justified for a site with no real backend work to do.',
          services: ['S3', 'CloudFront', 'API Gateway', 'Lambda', 'DynamoDB'],
        },
        {
          label: '// shipped',
          title: 'Amplify hosting with Route 53',
          caption:
            'AWS Amplify builds and serves the Next.js app, pulling from GitHub on every push to main. Route 53 handles DNS for the custom domain, and an AWS Budget plus a CloudWatch billing alarm watch the spend. One service to manage, and hosting that lands around a few cents a month.',
          services: ['AWS Amplify', 'Route 53', 'CloudWatch', 'GitHub CI'],
        },
      ],
      note:
        'The tradeoff I would defend in an interview: the serverless design was the more impressive diagram, but there was no dynamic workload behind it. Choosing the simpler architecture cost nothing a user experiences and removed four services I would otherwise be responsible for keeping healthy.',
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
        items: ['AWS Amplify', 'CloudWatch', 'Route 53'],
      },
      {
        label: 'Tooling',
        items: ['Git', 'GitHub', 'ESLint', 'Figma'],
      },
    ],
    problem: {
      before: {
        label: '// before',
        heading: 'A hand-coded static site',
        points: [
          'Plain HTML with CSS and Bootstrap, hosted free on GitHub Pages',
          'No components — the nav, footer, and cards were copied into every page',
          'Changing one shared element meant editing the same markup in several files',
          'Styling was global and hard to keep consistent as pages were added',
        ],
      },
      after: {
        label: '// after',
        heading: 'A modular Next.js app',
        points: [
          'Every section is a typed, reusable React component, so a change lands in one place',
          'Project pages are generated from a single case-study template fed by a config file — adding a project is adding data, not building a page',
          'A shared design-token layer keeps color, type, and spacing consistent across every page',
          'Deployed on AWS Amplify with automatic builds on each push to main, served on a custom domain through Route 53',
        ],
      },
    },
    impact: [
      {
        value: '~$0.03',
        label: 'Projected hosting / month',
        description:
          'Amplify hosting for a site this size lands around a few cents a month, tracked with an AWS Budget and a CloudWatch billing alarm.',
      },
      {
        value: '1 template',
        label: 'Drives every project page',
        description:
          'A single case-study template renders every project page from a config entry, so each new project is a data change instead of a new hand-built page.',
      },
      {
        value: '0 steps',
        label: 'Manual deploy work',
        description:
          'Amplify builds and publishes automatically from GitHub on every push to main — no manual upload.',
      },
    ],
    features: [
      {
        title: 'Template-driven project pages',
        body: 'Each project page is composed from modular sections (tech stack, before/after, impact, features, lessons) keyed off a single config file. Adding a project means adding a config entry, not building a page.',
      },
      {
        title: 'One component system',
        body: 'Buttons, headings, badges, and section layouts are shared components reused across the home, about, and project pages, so the whole site stays visually consistent.',
      },
      {
        title: 'Continuous deployment on Amplify',
        body: 'Pushing to main triggers an Amplify build that compiles the Next.js app and publishes it — the same model as the old GitHub Pages site, but with full control over the pipeline.',
      },
      {
        title: 'Cost monitoring from day one',
        body: 'An AWS Budget and a CloudWatch billing alarm watch the account so there are no surprises — useful practice for the Solutions Architect work this project supports.',
      },
    ],
    lessons: [
      'Deciding component boundaries before writing JSX saved far more time than it cost.',
      'A shared layout plus a config-driven page template turns "add a project" into a five-minute change.',
      'Amplify made the deploy story simpler than the serverless stack I originally planned, with nothing lost for a static site.',
      'Setting a budget and billing alarm early is the cheapest insurance in all of AWS.',
    ],
  },

  'sai-system': {
    slug: 'sai-system',
    title: 'SAI System',
    summary:
      'SAI stands for Specialized Artificial Intelligence. Instead of one assistant that tries to do everything, SAI is a set of agents that each stay in their own lane. You sign in, bring your own LLM API key, and talk to a specialist. What makes each one a specialist isn’t a different model — it’s a folder of Markdown instructions that shapes how that agent thinks, acts, and responds. I built it to explore how far you can push an agent’s behavior with instruction design alone before you ever touch the model itself.',
    links: [
      { label: 'Live Demo', href: 'https://sai-system.vercel.app/', primary: true },
    ],
    languages: [
      { name: 'TypeScript', percent: 94.0, color: LANG_COLOR.typescript },
      { name: 'CSS', percent: 4.5, color: LANG_COLOR.css },
      { name: 'JavaScript', percent: 1.5, color: LANG_COLOR.javascript },
    ],
    overview: [
      { label: 'Type', value: 'Bring-your-own-key AI platform' },
      { label: 'Focus', value: 'Agent behavior via instruction design' },
      { label: 'Hosting', value: 'Vercel' },
      { label: 'Status', value: 'Ongoing — live demo up' },
    ],
    techStack: [
      {
        label: 'Framework',
        items: ['Next.js', 'React', 'TypeScript'],
      },
      {
        label: 'Auth & Hosting',
        items: ['AWS Cognito', 'Vercel'],
      },
      {
        label: 'AI',
        items: ['Bring-your-own-key', 'Markdown instruction sets', 'Per-agent prompting'],
      },
    ],
    showcase: {
      title: 'The Agents',
      description:
        'Each agent is defined by its own set of Markdown instructions. One is live to try now; the rest are in progress.',
      items: [
        {
          title: 'Forge — live',
          body: 'A hands-on build assistant for indoor and outdoor DIY projects. It gives materials, shopping lists, and an honest call on when a job is worth hiring out.',
        },
        {
          title: 'Challenger — in progress',
          body: 'A decision partner built to pressure-test choices and lay out the tradeoffs instead of just agreeing with you.',
        },
        {
          title: 'Scout — in progress',
          body: 'A research agent focused on finding, comparing, and citing sources rather than answering from memory.',
        },
        {
          title: 'Pathfinder — in progress',
          body: 'A planning agent for career and learning roadmaps, mapping a goal into concrete next steps.',
        },
      ],
    },
    features: [
      {
        title: 'Bring your own key',
        body: 'You connect your own LLM API key, so you stay in control of which provider you use and of your own usage and billing. Keys are encrypted at rest.',
      },
      {
        title: 'Specialists, not a generalist',
        body: 'Picking the right agent for the task gives sharper answers than one do-everything chatbot. You can choose a specialist directly or take a short quiz to be matched to one.',
      },
      {
        title: 'Instruction-defined behavior',
        body: 'Each agent’s personality and expertise come from a folder of Markdown instructions, so tuning an agent means editing prose, not retraining a model.',
      },
      {
        title: 'Accounts and saved chats',
        body: 'Sign-in runs on AWS Cognito and conversations are saved to your account, so you can pick a thread back up later.',
      },
    ],
    lessons: [
      'Feeding an agent Markdown instructions shapes its behavior, but it isn’t fine-tuning — it’s prompt and context engineering, and it has real limits.',
      'The honest next step is fine-tuning on actual datasets; that’s where this project is headed as it keeps evolving.',
      'A single all-purpose chatbot felt like a copy of what already exists, so the more interesting direction is narrow, opinionated specialists.',
      'Next up is a game mode: instead of just chatting, you’d use the agents to work through simulated real-world problems.',
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
      'What’s the Dog Doing? is a 3D tower-defense game where you play as Doge, a post-apocalyptic dog defending the last skyscraper of his owner’s world from endless waves of cats. You explore the map, collect bones, and place turrets and traps to hold the line as each wave gets harder. It was a five-person team project, and I led it while handling our sound, assets, UI, and Doge’s movement. The game is unfinished, but there’s a playable WebGL build you can try in the browser.',
    links: [
      { label: 'Play The Game', href: 'https://dog-game-demo.vercel.app/', primary: true },
    ],
    /*
     * The demo also gets its own block partway down the page. The banner
     * button above is the first thing on the page, but it scrolls out of
     * reach immediately on a write-up this long, and a reader who decides
     * to try the game after reading about it shouldn't have to scroll back.
     */
    playable: {
      href: 'https://dog-game-demo.vercel.app/',
      label: 'Play The Demo',
      copy: 'The WebGL build runs in the browser — no install, no Unity, no download. Use WASD to move Doge, collect bones, and place turrets before the next wave of cats arrives. The game is unfinished, so expect rough edges, but the core loop is all there and playable.',
      notes: [
        { label: 'Platform', value: 'Browser (WebGL) — desktop recommended' },
        { label: 'Controls', value: 'WASD to move, mouse to place and aim' },
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
          'Coordinated assignments and built front-end systems: Doge’s movement, player interactions, UI, and sound. Created sounds, assets, and UI elements, and helped guide the team’s design choices and overall aesthetic.',
        isMe: true,
      },
      {
        role: 'Combat System Designer',
        contribution: 'Implemented enemy waves, AI behavior, and the player’s weapons.',
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
        role: 'Upgrades & Abilities Programmer',
        contribution: 'Created the skill trees, abilities, and power-up mechanics.',
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
          body: 'A lightweight, rapid-fire unit for swarms. Cheap and fast, it’s ideal for early-game defense and keeping steady pressure across waves.',
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
        body: 'Doge’s bark temporarily disables nearby enemies, giving players an active ability to buy time in a tight spot.',
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
          image: '/projects/dog-game/turret-test.png',
          caption: 'Figure 7. Testing turret placement and damage.',
        },
        {
          image: '/projects/dog-game/spike-trap-test.png',
          caption: 'Figure 8. Testing the spike trap on enemies.',
        },
        {
          image: '/projects/dog-game/cannon-wireframe.png',
          caption: 'Figure 9. The team’s first cannon wireframe.',
        },
        {
          image: '/projects/dog-game/cannon-test.png',
          caption: 'Figure 10. Testing a turret, spike trap, and finally the cannon.',
        },
        {
          image: '/projects/dog-game/pea-shooter-test.png',
          caption: 'Figure 11. Early testing of the pea shooter.',
        },
        {
          image: '/projects/dog-game/bomb.png',
          caption: 'Figure 12. Early testing of the bomb.',
        },
        {
          image: '/projects/dog-game/enemy-kill-test.png',
          caption: 'Figure 13. Killing enemies to collect bones.',
        },
        {
          image: '/projects/dog-game/ui-wireframe.png',
          caption: 'Figure 14. Our first in-game UI wireframe.',
        },
        {
          image: '/projects/dog-game/inventory.png',
          caption: 'Figure 15. The inventory system, built first.',
        },
        {
          image: '/projects/dog-game/shop.png',
          caption: 'Figure 16. The shop, for buying defense items.',
        },
        {
          image: '/projects/dog-game/bullets.png',
          caption: 'Figure 17. Custom bullets with Doge-face detailing.',
        },
      ],
    },
    lessons: [
      'Leading a five-person team meant the design only stayed coherent when assignments and the shared aesthetic were clear up front.',
      'Readable feedback on placement, targeting, and damage mattered as much as the mechanics themselves — players need to see what’s happening.',
      'Iterative playtesting is what tuned wave pacing and difficulty into a curve that challenges without frustrating.',
      'Small touches like custom Doge-face bullets are invisible in motion, but they’re the polish that makes a game feel cared for.',
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
  // Image assets, if added, go in the same folder; each showcase/gallery item's
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
          body: 'A depth map that recovers the geometry of what was pressed — effectively reconstructing the 3D shape of the object’s surface from a single touch.',
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
      'Tactile images look nothing like camera images, so the hard part is learning what the sensor’s deformation patterns actually mean.',
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
 * Return every known case study slug — used by Next's generateStaticParams.
 *
 * @returns Array of slug strings
 */
export function getAllCaseStudySlugs(): string[] {
  return Object.keys(CASE_STUDIES);
}
