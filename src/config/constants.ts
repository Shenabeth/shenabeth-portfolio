/*
 * File: constants.ts
 * Purpose: Hardcoded constants, configuration values, and static data
 */

import { Project, Certification, SkillCategory, Education } from '@/types';

export const SOCIAL_LINKS = {
  github: 'https://github.com/Shenabeth',
  linkedin: 'https://www.linkedin.com/in/shenabeth-jenkins/',
  credly: 'https://www.credly.com/users/shenabeth-jenkins/badges/credly',
  email: 'shenabeth@gmail.com',
};

/**
 * Resume PDF asset. The canonical file lives in the repo ROOT as
 * `Shenabeth_Jenkins_Software_Engineer_Resume.pdf` so it's easy to drop in
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
    caseStudyLink: '/projects/portfolio-site',
    status: 'live',
    featured: true,
  },
  {
    id: 'sai-system',
    title: 'SAI System',
    category: 'AI Platform · Bring Your Own Key',
    description:
      'A bring-your-own-key AI platform where users connect their own LLM API key and work with custom agents in a secure, personalized environment.',
    longDescription:
      'A bring-your-own-key AI platform. Users sign in, add their own OpenAI, Anthropic, or other LLM API keys, and interact with custom AI agents. Includes user authentication, persisted chat history, and flexible per-user agent configuration.',
    techStack: ['Next.js', 'TypeScript', 'Supabase'],
    caseStudyLink: '/projects/sai-system',
    status: 'coming-soon',
    featured: true,
  },
  {
    id: 'dog-game',
    title: 'Dog Game',
    category: 'Game Development · Tower Defense',
    description:
      'An endless tower-defense game made in Unity, where players build a defense and protect their territory for as long as they can.',
    longDescription:
      'A browser-playable endless tower-defense game built in Unity and exported to WebGL. The focus was tight, readable gameplay and a satisfying difficulty curve as waves escalate.',
    techStack: ['Unity', 'C#', 'WebGL'],
    caseStudyLink: '/projects/dog-game',
    status: 'live',
    featured: true,
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
];

// Additional certifications shown only when the "view all credentials" toggle is expanded
export const HIDDEN_CERTIFICATIONS: Certification[] = [
  {
    id: 'adobe-photoshop-associate',
    name: 'Adobe Certified Associate in Visual Communication Using Adobe Photoshop CS6',
    code: 'PS',
    issuer: 'Adobe',
    dateEarned: 'June 12, 2017',
    credlyUrl: 'https://www.credly.com/badges/4e8208f9-ae4a-4c04-be03-a969b0dbd681',
    badgeUrl: '/certs/photoshop.png',
  },
  {
    id: 'google-ux-design',
    name: 'Google UX Design Professional Certificate',
    code: 'UX',
    issuer: 'Coursera',
    dateEarned: 'February 2025',
    credlyUrl: 'https://www.credly.com/badges/59280511-11e4-4f2f-8e50-83bf15dcb6ba',
    badgeUrl: '/certs/google-ux.png',
  },
  {
    id: 'microsoft-ux-design',
    name: 'Microsoft UX Design Professional Certificate',
    code: 'UX',
    issuer: 'Coursera',
    dateEarned: 'February 2025',
    credlyUrl: 'https://www.credly.com/badges/15391522-233a-49a0-a45b-8ea3b00b48a5',
    badgeUrl: '/certs/microsoft-ux.png',
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
