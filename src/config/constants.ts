/*
 * File: constants.ts
 * Purpose: Hardcoded constants, configuration values, and static data
 */

import { Project, Certification, SkillCategory } from '@/types';

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
    description: 'A dynamic portfolio site built with Next.js and hosted on AWS.',
    longDescription:
      'A dynamic portfolio site built with Next.js and hosted on AWS. Features admin authentication, dynamic project pages stored in DynamoDB, and responsive design. This site is a case study in full-stack development and serverless architecture.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'AWS Lambda', 'DynamoDB', 'Cognito', 'S3', 'CloudFront'],
    githubLink: 'https://github.com/shenabeth/portfolio',
    demoLink: 'https://portfolio.example.com',
    status: 'live',
    featured: true,
  },
  {
    id: 'sai-system',
    title: 'SAI System',
    description: 'A bring-your-own-key AI platform for interacting with custom AI agents.',
    longDescription:
      'A bring-your-own-key AI platform. Users log in, add their OpenAI/Claude/other LLM API keys, and interact with custom AI agents. Features user authentication, chat history persistence, and flexible agent customization.',
    techStack: ['Next.js', 'TypeScript', 'Supabase', 'AWS', 'LLM Integration'],
    githubLink: 'https://github.com/shenabeth/sai-system',
    caseStudyLink: 'https://portfolio.example.com/projects/sai-system',
    status: 'coming-soon',
    featured: true,
  },
  {
    id: 'dog-game',
    title: 'Dog Game',
    description: 'A browser-based game about raising and training a dog, built with Unity.',
    longDescription:
      'A browser-based game about raising and training a dog, built with Unity and hosted on Vercel. Focuses on intuitive gameplay and engaging progression mechanics.',
    techStack: ['Unity', 'C#', 'Vercel'],
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
    issuer: 'CompTIA',
    dateEarned: 'January 2024',
    credlyUrl: 'https://credly.com/badges/comptia-tech-plus',
  },
  {
    id: 'aws-clf',
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    dateEarned: 'June 2024',
    credlyUrl: 'https://credly.com/badges/aws-clf',
  },
  {
    id: 'aws-saa-c03',
    name: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    dateEarned: 'In Progress',
    credlyUrl: 'https://credly.com/badges/aws-saa-c03',
  },
];

export const SKILLS_BY_CATEGORY: SkillCategory[] = [
  {
    category: 'Frontend',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'shadcn/ui', 'Framer Motion', 'React Native'],
  },
  {
    category: 'Backend/Full-Stack',
    skills: ['Node.js', 'API Design', 'Authentication', 'Database Design', 'Serverless'],
  },
  {
    category: 'Cloud/AWS',
    skills: ['S3', 'CloudFront', 'Lambda', 'API Gateway', 'DynamoDB', 'Cognito', 'EC2', 'RDS', 'Secrets Manager'],
  },
  {
    category: 'AI/ML',
    skills: ['Prompt Engineering', 'LLM Integration', 'Agent Design', 'Model Selection'],
  },
  {
    category: 'Tools & Practices',
    skills: ['Git', 'GitHub', 'GitHub Actions', 'Responsive Design', 'Dark Mode', 'Type Safety'],
  },
  {
    category: 'Other',
    skills: ['UX/UI Design', 'Web Analytics', 'C++'],
  },
];

export const EDUCATION = {
  degree: 'Computer Science',
  university: 'University Name',
};

export const CONTACT_EMAIL = 'shenakinz610@gmail.com';
