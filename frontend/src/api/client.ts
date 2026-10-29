/* ========================================
   Lipi Sabha — API Client
   ======================================== */

const API_BASE = '/api';

// Get CSRF token from cookie
function getCsrfToken(): string {
  const cookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('csrftoken='));
  return cookie ? cookie.split('=')[1] : '';
}

// Base fetch wrapper with auth & CSRF
async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE}${path}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-CSRFToken': getCsrfToken(),
    ...(options.headers as Record<string, string> || {}),
  };

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(response.status, response.statusText, errorData);
  }

  if (response.status === 204) return undefined as T;
  return response.json();
}

export class ApiError extends Error {
  status: number;
  data: Record<string, unknown>;

  constructor(status: number, statusText: string, data: Record<string, unknown>) {
    super(`API Error ${status}: ${statusText}`);
    this.status = status;
    this.data = data;
  }
}

// ---- Auth API ----
export const authApi = {
  register: (data: { email: string; password: string; display_name: string }) =>
    apiFetch('/auth/register/', { method: 'POST', body: JSON.stringify(data) }),

  login: (data: { email: string; password: string }) =>
    apiFetch('/auth/login/', { method: 'POST', body: JSON.stringify(data) }),

  logout: () =>
    apiFetch('/auth/logout/', { method: 'POST' }),

  me: () =>
    apiFetch<import('@/types').User>('/auth/me/'),

  csrf: () =>
    apiFetch('/auth/csrf/'),
};

// ---- Projects API ----
export const projectsApi = {
  list: (params?: Record<string, string>) => {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<import('@/types').Project[]>(`/projects/${query}`);
  },

  get: (id: number) =>
    apiFetch<import('@/types').Project>(`/projects/${id}/`),

  create: (data: Partial<import('@/types').Project>) =>
    apiFetch<import('@/types').Project>('/projects/', { method: 'POST', body: JSON.stringify(data) }),

  update: (id: number, data: Partial<import('@/types').Project>) =>
    apiFetch<import('@/types').Project>(`/projects/${id}/`, { method: 'PATCH', body: JSON.stringify(data) }),
};

// ---- Learning API ----
export const learningApi = {
  quests: () =>
    apiFetch<import('@/types').LearningQuest[]>('/learning/quests/'),

  quest: (id: number) =>
    apiFetch<import('@/types').LearningQuest>(`/learning/quests/${id}/`),

  progress: () =>
    apiFetch<import('@/types').LearningProgress[]>('/learning/progress/'),

  completeLesson: (questId: number, lessonId: number, data: { answer?: string | number }) =>
    apiFetch('/learning/progress/', { method: 'POST', body: JSON.stringify({ quest_id: questId, lesson_id: lessonId, ...data }) }),
};

// ---- Gamification API ----
export const gamificationApi = {
  profile: () =>
    apiFetch<import('@/types').GamificationProfile>('/gamification/me/'),

  history: () =>
    apiFetch<import('@/types').XPEvent[]>('/gamification/history/'),

  badges: () =>
    apiFetch<import('@/types').Badge[]>('/gamification/badges/'),
};

// ---- Contributions API ----
export const contributionsApi = {
  create: (data: Partial<import('@/types').Contribution>) =>
    apiFetch<import('@/types').Contribution>('/contributions/', { method: 'POST', body: JSON.stringify(data) }),

  mine: () =>
    apiFetch<import('@/types').Contribution[]>('/contributions/mine/'),

  get: (id: number) =>
    apiFetch<import('@/types').Contribution>(`/contributions/${id}/`),

  update: (id: number, data: Partial<import('@/types').Contribution>) =>
    apiFetch<import('@/types').Contribution>(`/contributions/${id}/`, { method: 'PATCH', body: JSON.stringify(data) }),

  submit: (id: number) =>
    apiFetch(`/contributions/${id}/submit/`, { method: 'POST' }),

  withdraw: (id: number) =>
    apiFetch(`/contributions/${id}/withdraw/`, { method: 'POST' }),
};

// ---- Reviews API ----
export const reviewsApi = {
  queue: () =>
    apiFetch<import('@/types').ReviewTask[]>('/reviews/queue/'),

  get: (id: number) =>
    apiFetch<import('@/types').ReviewTask>(`/reviews/${id}/`),

  submit: (id: number, data: { action: string; rationale: string; rubric_results?: import('@/types').RubricResult[] }) =>
    apiFetch(`/reviews/${id}/submit/`, { method: 'POST', body: JSON.stringify(data) }),

  escalate: (id: number, data: { reason: string }) =>
    apiFetch(`/reviews/${id}/escalate/`, { method: 'POST', body: JSON.stringify(data) }),
};

// ---- Community API ----
export const communityApi = {
  proposals: () =>
    apiFetch<import('@/types').Proposal[]>('/proposals/'),

  proposal: (id: number) =>
    apiFetch<import('@/types').Proposal>(`/proposals/${id}/`),

  createProposal: (data: Partial<import('@/types').Proposal>) =>
    apiFetch<import('@/types').Proposal>('/proposals/', { method: 'POST', body: JSON.stringify(data) }),

  participate: (proposalId: number, data: { feedback: string }) =>
    apiFetch(`/proposals/${proposalId}/participate/`, { method: 'POST', body: JSON.stringify(data) }),

  decision: (id: number) =>
    apiFetch<import('@/types').DecisionRecord>(`/decisions/${id}/`),
};

// ---- Notifications API ----
export const notificationsApi = {
  list: () =>
    apiFetch<import('@/types').Notification[]>('/notifications/'),

  markRead: (id: number) =>
    apiFetch(`/notifications/${id}/read/`, { method: 'POST' }),

  markAllRead: () =>
    apiFetch('/notifications/read-all/', { method: 'POST' }),
};

// ---- Admin API ----
export const adminApi = {
  overview: () =>
    apiFetch<import('@/types').AdminOverview>('/admin/overview/'),

  auditLog: (params?: Record<string, string>) => {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<import('@/types').AuditEvent[]>(`/admin/audit-log/${query}`);
  },
};
