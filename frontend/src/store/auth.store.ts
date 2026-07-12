import { AuthState, User } from '@/types/auth';
import { STORAGE_KEYS } from '@/lib/constants';

type Listener = (state: AuthState) => void;

class AuthStore {
  private state: AuthState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  };

  private listeners = new Set<Listener>();

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const useDemo = process.env.NEXT_PUBLIC_USE_DEMO_AUTH === 'true';
        const storedUser = useDemo
          ? localStorage.getItem('user')
          : localStorage.getItem(STORAGE_KEYS.USER);
        const storedToken = useDemo
          ? localStorage.getItem('accessToken')
          : localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
        const storedRefresh = useDemo
          ? localStorage.getItem('refreshToken')
          : localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

        this.state = {
          user: storedUser ? JSON.parse(storedUser) : null,
          accessToken: storedToken ? storedToken.replace(/^"(.*)"$/, '$1') : null,
          refreshToken: storedRefresh ? storedRefresh.replace(/^"(.*)"$/, '$1') : null,
          isAuthenticated: !!storedToken,
          isLoading: false,
          error: null,
        };
      } catch (e) {
        console.error('Failed to initialize AuthStore from localStorage:', e);
      }
    }
  }

  getState(): AuthState {
    return this.state;
  }

  setState(nextState: Partial<AuthState>): void {
    this.state = { ...this.state, ...nextState };
    this.notify();
  }

  setLoading(isLoading: boolean): void {
    this.setState({ isLoading });
  }

  setError(error: string | null): void {
    this.setState({ error });
  }

  setUser(user: User | null): void {
    if (typeof window !== 'undefined') {
      const useDemo = process.env.NEXT_PUBLIC_USE_DEMO_AUTH === 'true';
      if (user) {
        if (useDemo) {
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('role', user.role);
        }
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      } else {
        if (useDemo) {
          localStorage.removeItem('user');
          localStorage.removeItem('role');
        }
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    }
    this.setState({ user });
  }

  setSession(user: User, accessToken: string, refreshToken: string): void {
    if (typeof window !== 'undefined') {
      const useDemo = process.env.NEXT_PUBLIC_USE_DEMO_AUTH === 'true';
      if (useDemo) {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('role', user.role);
        localStorage.setItem('expiresAt', String(Date.now() + 60 * 60 * 24 * 7 * 1000));
      }
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, JSON.stringify(accessToken));
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, JSON.stringify(refreshToken));
      
      // Set cookie for Next.js Middleware route protection
      document.cookie = `transitops-token=${accessToken}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
    }
    this.setState({
      user,
      accessToken,
      refreshToken,
      isAuthenticated: true,
      error: null,
    });
  }

  clearSession(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.USER);
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);

      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('role');
      localStorage.removeItem('expiresAt');
      
      // Remove cookie
      document.cookie = 'transitops-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
    }
    this.setState({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      error: null,
    });
  }

  logout(): void {
    this.clearSession();
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(): void {
    this.listeners.forEach((listener) => listener(this.state));
  }
}

export const authStore = new AuthStore();
export default authStore;
