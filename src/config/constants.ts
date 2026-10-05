/*
 * File: constants.ts
 * Purpose: Hardcoded constants, configuration values, and static data
 */

import { Project, Certification, SkillCategory, Education } from '@/types';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

export const SOCIAL_LINKS = {
  github: 'https://github.com/shenabeth',
  linkedin: 'https://linkedin.com/in/shenabeth',
  credly: 'https://credly.com/users/shenabeth',
};

export const FEATURED_PROJECTS: Project[] = [
  {
    id: 'portfolio-site',
    title: 'Portfolio Site',
    category: 'Portfolio · Full-Stack Development',
    description: 'My personal corner of the web, built to share my work, experience, and approach to creating thoughtful software.',
    longDescription:
      'A dynamic portfolio site built with Next.js and hosted on AWS. Features admin authentication, dynamic project pages stored in DynamoDB, and responsive design. This site is a case study in full-stack development and serverless architecture.',
    techStack: ['React', 'TypeScript', 'AWS Services'],
    githubLink: 'https://github.com/shenabeth/portfolio',
    demoLink: 'https://portfolio.example.com',
    status: 'live',
    featured: true,
  },
  {
    id: 'sai-system',
    title: 'SAI System',
    category: 'Fine-Tuned AI · Bring Your Own Key',
    description: 'A custom fine-tuned AI platform where users connect their own API key and work in a secure, personalized environment.',
    longDescription:
      'A bring-your-own-key AI platform. Users log in, add their OpenAI/Claude/other LLM API keys, and interact with custom AI agents. Features user authentication, chat history persistence, and flexible agent customization.',
    techStack: ['AWS Cognito', 'DynamoDB', 'Amazon Bedrock'],
    githubLink: 'https://github.com/shenabeth/sai-system',
    caseStudyLink: 'https://portfolio.example.com/projects/sai-system',
    status: 'coming-soon',
    featured: true,
  },
  {
    id: 'dog-game',
    title: 'Dog Game',
    category: 'Game Development · Tower Defense',
    description: 'An endless tower defense game made in Unity, where players build a defense and protect their territory for as long as possible.',
    longDescription:
      'A browser-based game about raising and training a dog, built with Unity and hosted on Vercel. Focuses on intuitive gameplay and engaging progression mechanics.',
    techStack: ['Unity', 'C#', 'Game Design'],
    githubLink: 'https://github.com/shenabeth/dog-game',
    demoLink: 'https://dog-game.example.com',
    status: 'live',
    featured: true,
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'comptia-tech-plus',
    name: 'CompTIA Tech+',
    code: 'TECH+',
    issuer: 'CompTIA',
    dateEarned: 'January 2024',
    credlyUrl: 'https://credly.com/badges/comptia-tech-plus',
  },
  {
    id: 'aws-clf',
    name: 'AWS Certified Cloud Practitioner',
    code: 'CLF',
    issuer: 'Amazon Web Services',
    dateEarned: 'June 2024',
    credlyUrl: 'https://credly.com/badges/aws-clf',
  },
  {
    id: 'aws-saa-c03',
    name: 'AWS Certified Solutions Architect – Associate',
    code: 'SAA',
    issuer: 'Amazon Web Services',
    dateEarned: 'In Progress',
    credlyUrl: 'https://credly.com/badges/aws-saa-c03',
  },
];

// Additional certifications shown only when the "view all credentials" toggle is expanded
export const HIDDEN_CERTIFICATIONS: Certification[] = [
  {
    id: 'adobe-photoshop-associate',
    name: 'Adobe Certified Professional: Photoshop',
    code: 'PS',
    issuer: 'Adobe',
    dateEarned: 'TBD',
    credlyUrl: 'https://credly.com/badges/adobe-photoshop-associate',
  },
  {
    id: 'google-ux-design',
    name: 'Google UX Design Professional Certificate',
    code: 'UX',
    issuer: 'Google (Coursera)',
    dateEarned: 'TBD',
    credlyUrl: 'https://credly.com/badges/google-ux-design',
  },
];

export const EDUCATION: Education[] = [
  {
    degree: 'Bachelor of Science in Computer Science',
    university: 'University of Maryland',
    year: '2025',
    tag: 'CORE_SYSTEM',
  },
  {
    degree: 'Associate of Arts in Computer Science',
    university: 'Montgomery College',
    year: '2023',
    tag: 'FOUNDATION',
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

export const ALL_TECH_SKILLS: string[] = TECH_STACK.flatMap((c) => c.skills);

export const CONTACT_EMAIL = 'shenakinz610@gmail.com';
