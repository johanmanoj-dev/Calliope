export const API_ROUTES = {
  HEALTH: '/health',
  AUTH: {
    GOOGLE: '/api/auth/google',
    GOOGLE_CALLBACK: '/api/auth/google/callback',
    LOGOUT: '/api/auth/logout',
    ME: '/api/auth/me',
  },
  PORTFOLIO: {
    ME: '/api/portfolio/me',
    CREATE: '/api/portfolio',
    UPDATE: (id: string) => `/api/portfolio/${id}`,
    PUBLISH: (id: string) => `/api/portfolio/${id}/publish`,
  },
  PROJECTS: {
    CREATE: '/api/projects',
    UPDATE: (id: string) => `/api/projects/${id}`,
    DELETE: (id: string) => `/api/projects/${id}`,
  },
  MESSAGES: {
    SUBMIT: (username: string) => `/api/messages/${username}`,
    INBOX: '/api/messages',
  },
  UPLOAD: '/api/upload',
} as const;

export const FRONTEND_ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  BUILDER: '/dashboard/builder',
  INBOX: '/dashboard/inbox',
  SETTINGS: '/dashboard/settings',
  PUBLIC_PORTFOLIO: (username: string) => `/portfolio/${username}`,
} as const;
