import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { User, AuthState } from '@/types';

export type WorkspaceMode = 'user' | 'reviewer';

interface AuthContextType extends AuthState {
  activeWorkspace: WorkspaceMode;
  setActiveWorkspace: (workspace: WorkspaceMode) => void;
  isReviewer: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  setDemoUser: (role: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Demo users for MVP - clearly labeled as synthetic
const DEMO_USERS: Record<string, User> = {
  learner: {
    id: 1, email: 'learner@demo.lipisabha.org', display_name: 'Aria (User)',
    role: 'learner', learning_xp: 450, review_xp: 0, created_at: '2026-01-15',
  },
  contributor: {
    id: 2, email: 'contributor@demo.lipisabha.org', display_name: 'Kavi (User)',
    role: 'contributor', learning_xp: 820, review_xp: 0, created_at: '2025-11-20',
  },
  reviewer: {
    id: 3, email: 'reviewer@demo.lipisabha.org', display_name: 'Meera (Reviewer)',
    role: 'reviewer', learning_xp: 1200, review_xp: 650, created_at: '2025-09-10',
  },
  facilitator: {
    id: 4, email: 'facilitator@demo.lipisabha.org', display_name: 'Rohan (Community Facilitator)',
    role: 'facilitator', learning_xp: 1500, review_xp: 800, created_at: '2025-06-01',
  },
  admin: {
    id: 5, email: 'admin@demo.lipisabha.org', display_name: 'Admin',
    role: 'admin', learning_xp: 0, review_xp: 0, created_at: '2025-01-01',
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const [activeWorkspace, setActiveWorkspaceState] = useState<WorkspaceMode>(() => {
    const saved = localStorage.getItem('lipisabha_workspace');
    return (saved === 'reviewer' ? 'reviewer' : 'user') as WorkspaceMode;
  });

  const isReviewer = Boolean(
    state.user &&
    ['reviewer', 'specialist', 'facilitator', 'admin'].includes(state.user.role)
  );

  const setActiveWorkspace = useCallback((workspace: WorkspaceMode) => {
    setActiveWorkspaceState(workspace);
    localStorage.setItem('lipisabha_workspace', workspace);
  }, []);

  // Check for stored session on mount
  useEffect(() => {
    const stored = localStorage.getItem('lipisabha_demo_user');
    if (stored) {
      try {
        const user = JSON.parse(stored) as User;
        setState({ user, isAuthenticated: true, isLoading: false });
      } catch {
        localStorage.removeItem('lipisabha_demo_user');
        setState(s => ({ ...s, isLoading: false }));
      }
    } else {
      setState(s => ({ ...s, isLoading: false }));
    }
  }, []);

  const login = useCallback(async (email: string, _password: string) => {
    // In MVP demo mode, match against demo users
    // In production, this calls the real API
    const demoUser = Object.values(DEMO_USERS).find(u => u.email === email);
    if (demoUser) {
      setState({ user: demoUser, isAuthenticated: true, isLoading: false });
      localStorage.setItem('lipisabha_demo_user', JSON.stringify(demoUser));
      return;
    }
    // Try real API
    try {
      const response = await fetch('/api/auth/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password: _password }),
      });
      if (response.ok) {
        const user = await response.json();
        setState({ user, isAuthenticated: true, isLoading: false });
        return;
      }
    } catch {
      // Backend not available, use demo mode
    }
    // Create a basic demo user from the email
    const newUser: User = {
      id: Date.now(), email, display_name: email.split('@')[0],
      role: 'learner', learning_xp: 0, review_xp: 0, created_at: new Date().toISOString(),
    };
    setState({ user: newUser, isAuthenticated: true, isLoading: false });
    localStorage.setItem('lipisabha_demo_user', JSON.stringify(newUser));
  }, []);

  const register = useCallback(async (email: string, _password: string, displayName: string) => {
    const newUser: User = {
      id: Date.now(), email, display_name: displayName,
      role: 'learner', learning_xp: 0, review_xp: 0, created_at: new Date().toISOString(),
    };
    setState({ user: newUser, isAuthenticated: true, isLoading: false });
    localStorage.setItem('lipisabha_demo_user', JSON.stringify(newUser));
  }, []);

  const logout = useCallback(async () => {
    localStorage.removeItem('lipisabha_demo_user');
    setState({ user: null, isAuthenticated: false, isLoading: false });
  }, []);

  const setDemoUser = useCallback((role: string) => {
    const user = DEMO_USERS[role];
    if (user) {
      setState({ user, isAuthenticated: true, isLoading: false });
      localStorage.setItem('lipisabha_demo_user', JSON.stringify(user));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        activeWorkspace,
        setActiveWorkspace,
        isReviewer,
        login,
        register,
        logout,
        setDemoUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
