/*
 * File: auth.ts
 * Purpose: Authentication helper functions for token management
 */

/**
 * Retrieve stored access token from localStorage
 *
 * @returns Access token string or null if not found
 */
export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('accessToken');
}

/**
 * Retrieve stored refresh token from localStorage
 *
 * @returns Refresh token string or null if not found
 */
export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('refreshToken');
}

/**
 * Store access and refresh tokens in localStorage
 *
 * @param accessToken - JWT access token
 * @param refreshToken - JWT refresh token
 * @param expiresIn - Token expiration time in seconds
 */
export function setTokens(accessToken: string, refreshToken: string, expiresIn: number): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  setTokenExpiration(expiresIn);
}

/**
 * Clear all stored authentication tokens
 */
export function clearTokens(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('tokenExpiration');
}

/**
 * Check if access token has expired
 *
 * @returns True if token is expired or not found
 */
export function isTokenExpired(): boolean {
  if (typeof window === 'undefined') return true;
  const expiration = localStorage.getItem('tokenExpiration');
  if (!expiration) return true;
  return Date.now() > parseInt(expiration, 10);
}

/**
 * Set token expiration time in localStorage
 *
 * @param expiresIn - Token expiration time in seconds
 */
export function setTokenExpiration(expiresIn: number): void {
  if (typeof window === 'undefined') return;
  const expirationTime = Date.now() + expiresIn * 1000;
  localStorage.setItem('tokenExpiration', expirationTime.toString());
}
