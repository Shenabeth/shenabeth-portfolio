/*
 * File: api.ts
 * Purpose: API client functions for calling backend endpoints
 */

import { Project, AuthResponse, ContactFormData } from '@/types';
import { API_BASE_URL } from '@/config/constants';

/**
 * Make an API request with error handling and optional token
 *
 * @param endpoint - API endpoint path
 * @param options - Fetch options (method, body, headers, etc.)
 * @param token - Optional authorization token
 * @returns Parsed response data
 */
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {},
  token?: string,
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (options.headers) {
    const optionHeaders = options.headers as Record<string, string>;
    Object.assign(headers, optionHeaders);
  }

  const response = await fetch(url, {
    ...options,
    headers: headers as HeadersInit,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

/**
 * Fetch all projects from the API
 *
 * @param token - Optional authorization token
 * @returns Array of projects
 */
export async function getProjects(token?: string): Promise<Project[]> {
  return apiCall<Project[]>('/api/projects', { method: 'GET' }, token);
}

/**
 * Fetch a single project by ID
 *
 * @param id - Project ID
 * @param token - Optional authorization token
 * @returns Project object
 */
export async function getProject(id: string, token?: string): Promise<Project> {
  return apiCall<Project>(`/api/projects/${id}`, { method: 'GET' }, token);
}

/**
 * Create a new project (admin only)
 *
 * @param project - Project data to create
 * @param token - Authorization token
 * @returns Created project object
 */
export async function createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>, token: string): Promise<Project> {
  return apiCall<Project>(
    '/api/projects',
    {
      method: 'POST',
      body: JSON.stringify(project),
    },
    token,
  );
}

/**
 * Update an existing project (admin only)
 *
 * @param id - Project ID
 * @param updates - Partial project data to update
 * @param token - Authorization token
 * @returns Updated project object
 */
export async function updateProject(id: string, updates: Partial<Project>, token: string): Promise<Project> {
  return apiCall<Project>(
    `/api/projects/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify(updates),
    },
    token,
  );
}

/**
 * Delete a project (admin only)
 *
 * @param id - Project ID
 * @param token - Authorization token
 */
export async function deleteProject(id: string, token: string): Promise<void> {
  return apiCall<void>(
    `/api/projects/${id}`,
    {
      method: 'DELETE',
    },
    token,
  );
}

/**
 * Login user with email and password
 *
 * @param email - User email
 * @param password - User password
 * @returns Authentication response with tokens
 */
export async function login(email: string, password: string): Promise<AuthResponse> {
  return apiCall<AuthResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

/**
 * Logout user
 *
 * @param token - Authorization token
 */
export async function logout(token: string): Promise<void> {
  return apiCall<void>(
    '/api/auth/logout',
    {
      method: 'POST',
    },
    token,
  );
}

/**
 * Refresh access token using refresh token
 *
 * @param refreshToken - Refresh token
 * @returns Authentication response with new tokens
 */
export async function refreshToken(refreshToken: string): Promise<AuthResponse> {
  return apiCall<AuthResponse>('/api/auth/refresh', {
    method: 'POST',
    body: JSON.stringify({ refreshToken }),
  });
}

/**
 * Send contact form email
 *
 * @param data - Contact form data (name, email, message)
 */
export async function sendContactEmail(data: ContactFormData): Promise<void> {
  return apiCall<void>(
    '/api/contact',
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
  );
}
