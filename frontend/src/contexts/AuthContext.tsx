import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { User, AuthState, UserRole } from '@/types';

export type WorkspaceMode = 'user' | 'reviewer';

interface AuthContextType extends AuthState {
  activeWorkspace: WorkspaceMode;
  setActiveWorkspace: (workspace: WorkspaceMode) => void;
  isReviewer: boolean;
  allAccounts: User[];
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string, role?: UserRole) => Promise<void>;
  createAccount: (displayName: string, email: string, role: UserRole) => User;
  switchAccount: (userId: number) => void;
  logout: () => Promise<void>;
  setDemoUser: (role: string) => void;
  awardXP: (amount: number, reason?: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY_USER = 'lipisabha_demo_user';
const STORAGE_KEY_ACCOUNTS = 'lipisabha_all_user_accounts';

// Rich, diverse initial accounts representing unique community personas
const INITIAL_DEMO_ACCOUNTS: User[] = [
  {
    id: 1,
    email: 'learner@demo.lipisabha.org',
    display_name: 'Aria Patel (Community Speaker)',
    role: 'learner',
    learning_xp: 450,
    review_xp: 0,
    created_at: '2026-01-15'
  },
  {
    id: 2,
    email: 'contributor@demo.lipisabha.org',
    display_name: 'Kavi Sharma (Fieldwork Contributor)',
    role: 'contributor',
    learning_xp: 820,
    review_xp: 0,
    created_at: '2025-11-20'
  },
  {
    id: 3,
    email: 'reviewer@demo.lipisabha.org',
    display_name: 'Meera Desai (Lipi Specialist)',
    role: 'reviewer',
    learning_xp: 1200,
    review_xp: 650,
    created_at: '2025-09-10'
  },
  {
    id: 4,
    email: 'raghavan@demo.lipisabha.org',
    display_name: 'Prof. Raghavan (Epigraphy Reviewer)',
    role: 'reviewer',
    learning_xp: 1600,
    review_xp: 920,
    created_at: '2025-04-12'
  },
  {
    id: 5,
    email: 'kaul@demo.lipisabha.org',
    display_name: 'Dr. Sunil Kaul (Sharada Specialist)',
    role: 'reviewer',
    learning_xp: 1400,
    review_xp: 780,
    created_at: '2025-06-01'
  },
  {
    id: 6,
    email: 'ananya@demo.lipisabha.org',
    display_name: 'Ananya Sen (Student Researcher)',
    role: 'learner',
    learning_xp: 310,
    review_xp: 0,
    created_at: '2026-02-01'
  }
];

function getStoredAccounts(): User[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ACCOUNTS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {}
  return INITIAL_DEMO_ACCOUNTS;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accounts, setAccounts] = useState<User[]>(getStoredAccounts);
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

  const saveAccounts = useCallback((newAccs: User[]) => {
    setAccounts(newAccs);
    try {
      localStorage.setItem(STORAGE_KEY_ACCOUNTS, JSON.stringify(newAccs));
    } catch {}
  }, []);

  const setActiveWorkspace = useCallback((workspace: WorkspaceMode) => {
    setActiveWorkspaceState(workspace);
    localStorage.setItem('lipisabha_workspace', workspace);
  }, []);

  // Check for stored session on mount, or fallback to first demo account
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY_USER);
    if (stored) {
      try {
        const user = JSON.parse(stored) as User;
        setState({ user, isAuthenticated: true, isLoading: false });
        return;
      } catch {
        localStorage.removeItem(STORAGE_KEY_USER);
      }
    }
    // Default to Aria Patel so user space has an authentic active speaker
    const defaultUser = accounts[0] || INITIAL_DEMO_ACCOUNTS[0];
    setState({ user: defaultUser, isAuthenticated: true, isLoading: false });
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(defaultUser));
  }, []);

  const awardXP = useCallback((amount: number, _reason?: string) => {
    setState((prev) => {
      if (!prev.user) return prev;
      const updatedUser: User = {
        ...prev.user,
        learning_xp: (prev.user.learning_xp || 0) + amount,
        review_xp: ['reviewer', 'specialist', 'facilitator', 'admin'].includes(prev.user.role)
          ? (prev.user.review_xp || 0) + amount
          : (prev.user.review_xp || 0)
      };

      try {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updatedUser));
      } catch {}

      // Update in accounts array too
      setAccounts((prevAccs) => {
        const updatedAccs = prevAccs.map((acc) => (acc.id === updatedUser.id ? updatedUser : acc));
        try {
          localStorage.setItem(STORAGE_KEY_ACCOUNTS, JSON.stringify(updatedAccs));
        } catch {}
        return updatedAccs;
      });

      return {
        ...prev,
        user: updatedUser
      };
    });
  }, []);

  const switchAccount = useCallback((userId: number) => {
    const target = accounts.find((a) => a.id === userId);
    if (!target) return;
    setState({ user: target, isAuthenticated: true, isLoading: false });
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(target));

    if (['reviewer', 'specialist', 'facilitator', 'admin'].includes(target.role)) {
      setActiveWorkspace('reviewer');
    } else {
      setActiveWorkspace('user');
    }
  }, [accounts, setActiveWorkspace]);

  const createAccount = useCallback((displayName: string, email: string, role: UserRole): User => {
    const isRev = ['reviewer', 'specialist', 'facilitator', 'admin'].includes(role);
    const newUser: User = {
      id: Date.now(),
      email: email.trim() || `${displayName.toLowerCase().replace(/\s+/g, '')}@lipisabha.org`,
      display_name: displayName.trim(),
      role,
      learning_xp: isRev ? 1000 : 100,
      review_xp: isRev ? 500 : 0,
      created_at: new Date().toISOString()
    };

    const updated = [newUser, ...accounts];
    saveAccounts(updated);
    setState({ user: newUser, isAuthenticated: true, isLoading: false });
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(newUser));

    if (isRev) {
      setActiveWorkspace('reviewer');
    } else {
      setActiveWorkspace('user');
    }

    return newUser;
  }, [accounts, saveAccounts, setActiveWorkspace]);

  const login = useCallback(async (email: string, _password: string) => {
    const found = accounts.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setState({ user: found, isAuthenticated: true, isLoading: false });
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(found));
      if (['reviewer', 'specialist', 'facilitator', 'admin'].includes(found.role)) {
        setActiveWorkspace('reviewer');
      } else {
        setActiveWorkspace('user');
      }
      return;
    }

    const isRev = email.toLowerCase().includes('reviewer');
    const newUser: User = {
      id: Date.now(),
      email,
      display_name: email.split('@')[0],
      role: isRev ? 'reviewer' : 'learner',
      learning_xp: 100,
      review_xp: isRev ? 500 : 0,
      created_at: new Date().toISOString()
    };
    const updated = [newUser, ...accounts];
    saveAccounts(updated);
    setState({ user: newUser, isAuthenticated: true, isLoading: false });
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(newUser));
  }, [accounts, saveAccounts, setActiveWorkspace]);

  const register = useCallback(
    async (email: string, _password: string, displayName: string, role: UserRole = 'learner') => {
      createAccount(displayName, email, role);
    },
    [createAccount]
  );

  const logout = useCallback(async () => {
    localStorage.removeItem(STORAGE_KEY_USER);
    setState({ user: null, isAuthenticated: false, isLoading: false });
  }, []);

  const setDemoUser = useCallback(
    (role: string) => {
      const found = accounts.find((a) => a.role === role);
      if (found) {
        switchAccount(found.id);
      }
    },
    [accounts, switchAccount]
  );

  return (
    <AuthContext.Provider
      value={{
        ...state,
        activeWorkspace,
        setActiveWorkspace,
        isReviewer,
        allAccounts: accounts,
        login,
        register,
        createAccount,
        switchAccount,
        logout,
        setDemoUser,
        awardXP
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
