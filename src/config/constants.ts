/*
 * File: constants.ts
 * Purpose: Hardcoded constants, configuration values, and static data
 */

import {
  Project,
  Certification,
  SkillCategory,
  Education,
  Capability,
  ProjectCapability,
} from '@/types';

export const SOCIAL_LINKS = {
  github: 'https://github.com/Shenabeth',
  linkedin: 'https://www.linkedin.com/in/shenabeth-jenkins/',
  credly: 'https://www.credly.com/users/shenabeth-jenkins/badges/credly',
  email: 'shenabeth@gmail.com',
};

/**
 * Resume PDF asset. The canonical file lives in the repo ROOT as
 * `Shenabeth_Jenkins_Software_Engineer_Resume.pdf` so it\'s easy to drop in
 * a new version. A `prebuild` npm script copies it into `public/` (which is
 * git-ignored) before every build, so Next serves it from the site root at
 * the URL below. `downloadName` is the filename the browser suggests on save.
 * To update the resume: replace the root PDF — no code change needed.
 */
export const RESUME_FILENAME = 'Shenabeth_Jenkins_Software_Engineer_Resume.pdf';

export const RESUME = {
  url: `/${RESUME_FILENAME}`,
  downloadName: RESUME_FILENAME,
};

export const FEATURED_PROJECTS: Project[] = [
  {
    id: 'portfolio-site',
    title: 'Portfolio Site',
    category: 'Portfolio · Front-End Engineering',
    description:
      'This site. A rebuild of my old hand-coded portfolio into a modular, component-driven Next.js app deployed on AWS Amplify.',
    longDescription:
      'A complete rebuild of my original HTML/CSS/Bootstrap portfolio into a modular Next.js application. Every section is a typed, reusable React component, and project pages are generated from a single case-study template. Deployed on AWS Amplify with continuous deployment from GitHub.',
    techStack: ['Next.js', 'TypeScript', 'AWS Amplify'],
    githubLink: 'https://github.com/Shenabeth/shenabeth-portfolio',
    demoLink: '/',
    caseStudyLink: '/projects/portfolio-site',
    status: 'live',
    featured: true,
  },
  {
    id: 'sai-system',
    title: 'SAI System',
    category: 'AI Learning Platform · Dungeon RPG',
    description:
      'An AI-powered learning platform with a playable 3D dungeon-crawler where every puzzle is a real CS concept in disguise. Bring your own API key, chat with specialized agents, or explore procedurally generated floors.',
    longDescription:
      'SAI System combines AI-powered learning with a browser-native 3D dungeon-crawler RPG. Users bring their own API key, pick from nine specialized AI assistants, and chat — or enter a procedurally generated dungeon where every puzzle is a real computer science concept. Built with React Three Fiber for in-browser 3D, a backend-agnostic adapter layer, and client-side encryption for API keys.',
    techStack: ['Next.js', 'React Three Fiber', 'AWS Cognito'],
    demoLink: 'https://sai-system.vercel.app/',
    caseStudyLink: '/projects/sai-system',
    status: 'live',
    featured: true,
  },
  {
    id: 'dog-game',
    title: 'Dog Game',
    category: 'Game Development · Tower Defense',
    description:
      'A 3D tower-defense game made in Unity where you play as Doge, defending the last skyscraper from waves of cats with turrets and traps. A five-person team project I led.',
    longDescription:
      'What\'s the Dog Doing? is a 3D, open-world tower-defense game built in Unity and exported to WebGL. Players explore the map, collect bones, and place turrets and traps to survive escalating waves of cats. Built by a five-person team; I led it and handled sound, assets, UI, and Doge\'s movement.',
    techStack: ['Unity', 'C#', 'WebGL'],
    demoLink: 'https://dog-game-demo.vercel.app/',
    caseStudyLink: '/projects/dog-game',
    status: 'live',
    featured: true,
  },
];

/**
 * Secondary projects. These are NOT part of the featured carousel or the nav —
 * they\'re listed only in the "More Projects" section on the projects page, each
 * linking to its own case-study page. Keep featured work in FEATURED_PROJECTS;
 * add smaller / course / research projects here.
 */
export const MORE_PROJECTS: Project[] = [
  {
    id: 'panoramic-stitching',
    title: 'Panoramic Stitching',
    category: 'Python · Image Processing · Feature Matching',
    description:
      'A computer-vision pipeline that transforms raw images into a unified panoramic scene.',
    longDescription:
      'A Python computer-vision pipeline that stitches a set of overlapping photos into a single panorama. It detects distinctive features in each image, matches the overlapping ones between neighbors, solves for the transform that aligns them, and warps the frames into one seamless wide shot.',
    techStack: ['Python', 'OpenCV', 'NumPy'],
    caseStudyLink: '/projects/panoramic-stitching',
    status: 'live',
  },
  {
    id: 'depth-contact-ai',
    title: 'Depth and Contact Prediction AI',
    category: 'Python · Haptics · Prediction Model',
    description:
      'AI that reconstructs contact and 3D shape from tactile sensor images.',
    longDescription:
      'A deep-learning model that reads the images produced by a soft tactile sensor and predicts two aligned outputs: the contact area (where the object actually touches) and a depth map that recovers the 3D geometry of what was pressed. It turns a picture of a touch into an understanding of the shape behind it.',
    techStack: ['Python', 'Haptics', 'Deep Learning'],
    caseStudyLink: '/projects/depth-contact-ai',
    status: 'live',
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'aws-saa-c03',
    name: 'AWS Certified Solutions Architect – Associate',
    code: 'SAA',
    issuer: 'Amazon Web Services',
    dateEarned: 'In Progress',
    credlyUrl: '#',
    badgeUrl: '/certs/aws-saa.png',
  },
  {
    id: 'aws-clf',
    name: 'AWS Certified Cloud Practitioner',
    code: 'CLF',
    issuer: 'Amazon Web Services',
    dateEarned: 'September 2026',
    credlyUrl: 'https://www.credly.com/badges/77850338-9124-40b8-89cf-3ad16d7e4679',
    badgeUrl: '/certs/aws-ccp.png',
  },
  {
    id: 'comptia-tech-plus',
    name: 'CompTIA Tech+',
    code: 'TECH+',
    issuer: 'CompTIA',
    dateEarned: 'June 2026',
    credlyUrl: 'https://www.credly.com/badges/b6841f36-764a-4f46-a5d1-7496c6ec889c',
    badgeUrl: '/certs/comptia-techplus.png',
  },
  {
    id: 'adobe-photoshop-associate',
    name: 'Adobe Certified Associate — Photoshop',
    code: 'PS',
    issuer: 'Adobe',
    dateEarned: 'June 12, 2017',
    credlyUrl: 'https://www.credly.com/badges/4e8208f9-ae4a-4c04-be03-a969b0dbd681',
    badgeUrl: '/certs/photoshop.png',
  },
];

export const EDUCATION: Education[] = [
  {
    degree: 'Bachelor of Science in Computer Science',
    minor: 'Astronomy',
    university: 'University of Maryland',
    location: 'College Park, MD',
    tag: 'LATEST',
    logoUrl: '/schools/umd.svg',
  },
  {
    degree: 'Associate of Arts in Computer Science',
    university: 'Montgomery College',
    location: 'Rockville, MD',
    tag: 'FOUNDATION',
    logoUrl: '/schools/montgomery-college.svg',
  },
];

export const TECH_STACK: SkillCategory[] = [
  {
    category: 'Languages',
    skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'HTML/CSS', 'C', 'C++', 'C#', 'Kotlin'],
  },
  {
    category: 'Frontend & Backend',
    skills: ['React', 'React Native', 'Next.js', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'REST APIs', 'OAuth'],
  },
  {
    category: 'AWS Services',
    skills: ['S3', 'CloudFront', 'Lambda', 'API Gateway', 'DynamoDB', 'Cognito', 'EC2', 'RDS', 'Secrets Manager', 'SES'],
  },
  {
    category: 'Tools',
    skills: ['Git', 'GitHub', 'Figma', 'VS Code'],
  },
];

export const CONTACT_EMAIL = 'shenabeth@gmail.com';

/**
 * Abstract "capability" cards describing what I build, with `tags` pulled
 * from TECH_STACK above so they never drift out of sync with the real skill
 * data.
 *
 * Currently unrendered: the homepage row these fed was replaced by
 * PROJECT_CAPABILITIES below, which makes each card a real project rather
 * than a skill area. Kept because the data is still accurate and the
 * planned admin panel is the natural place to decide whether a page wants
 * capability cards framed as skills or as projects.
 */
export const CAPABILITIES: Capability[] = [
  {
    number: '01',
    title: 'Cloud architecture',
    copy: 'Secure, scalable AWS foundations designed around real operational needs — not diagram-driven complexity.',
    tags: TECH_STACK.find((g) => g.category === 'AWS Services')?.skills.slice(0, 4) ?? [],
  },
  {
    number: '02',
    title: 'Full-stack products',
    copy: 'Accessible interfaces and dependable application layers that make complex systems feel straightforward.',
    tags: TECH_STACK.find((g) => g.category === 'Frontend & Backend')?.skills.slice(0, 4) ?? [],
  },
  {
    number: '03',
    title: 'Languages & tooling',
    copy: 'Comfortable across the stack and the toolchain, from typed application code to systems-level work.',
    tags: TECH_STACK.find((g) => g.category === 'Languages')?.skills.slice(0, 4) ?? [],
  },
];

/**
 * The capability row under "Featured work" on /projects. These were the
 * landing page\'s three abstract skill cards (cloud architecture, full-stack
 * products, AI systems); each now names the project that demonstrates the
 * discipline, so the claim and the evidence are the same card. Text and
 * tags only — these deliberately carry no imagery.
 */
export const PROJECT_CAPABILITIES: ProjectCapability[] = [
  {
    kicker: 'Cloud architecture',
    title: 'Portfolio Site',
    copy: 'Secure, scalable AWS foundations built around real operational needs, not diagram-driven complexity. A serverless design was costed out, dropped in favor of a static site, and shipped on Amplify with monitoring from day one.',
    tags: ['AWS Amplify', 'Route 53', 'CloudWatch', 'Next.js'],
    href: '/projects/portfolio-site',
    demoLink: '/',
  },
  {
    kicker: 'Full-stack products',
    title: 'SAI System',
    copy: 'A learning platform and 3D dungeon RPG running entirely in the browser — procedural generation, nine AI agents, client-side encryption, and a backend-agnostic adapter layer, built as one typed application.',
    tags: ['Next.js', 'React Three Fiber', 'AWS Cognito', 'Three.js'],
    href: '/projects/sai-system',
    demoLink: 'https://sai-system.vercel.app/',
  },
  {
    kicker: 'AI systems',
    title: 'Dog Game',
    copy: 'Purpose-built behavior with clear boundaries, practical guardrails, and maintainable logic, shown here as the targeting, pathing, and wave systems driving a tower defense in Unity.',
    tags: ['Unity', 'C#', 'Game AI', 'Systems'],
    href: '/projects/dog-game',
    demoLink: 'https://dog-game-demo.vercel.app/',
  },
];

/**
 * The same row repeated under "Also built" on /projects, for the two
 * smaller course and research projects. Two cards, so the grid lays them
 * out as halves rather than leaving a third slot empty.
 */
export const MORE_PROJECT_CAPABILITIES: ProjectCapability[] = [
  {
    kicker: 'Computer vision',
    title: 'Panoramic Stitching',
    copy: 'Feature detection, matching, and homography solving composed into a pipeline that turns a set of overlapping photos into one seamless wide shot.',
    tags: ['Python', 'OpenCV', 'NumPy'],
    href: '/projects/panoramic-stitching',
  },
  {
    kicker: 'Applied machine learning',
    title: 'Depth & Contact Prediction AI',
    copy: 'A deep-learning model that reads soft tactile sensor images and predicts contact area and a depth map together, recovering 3D geometry from a picture of a touch.',
    tags: ['Python', 'Deep Learning', 'Haptics'],
    href: '/projects/depth-contact-ai',
  },
];

/**
 * Homepage About section copy. Kept here (not in component markup) per the
 * project convention that content lives in config. The degree line is
 * derived from EDUCATION at render time rather than restated here.
 */
export const ABOUT = {
  heading: 'Engineering should reduce friction, not add to it.',
  lead: 'I\'m Shenabeth, a computer science professional who enjoys finding the clean path through complicated problems.',
  body: 'My work spans cloud infrastructure, full-stack development, and applied AI. Across all three, I care about the same things: understandable systems, intentional interfaces, and details that hold up beyond the demo.',
  principles: [
    'Clarity over cleverness',
    'Useful over impressive',
    'Built to be maintained',
  ],
};
