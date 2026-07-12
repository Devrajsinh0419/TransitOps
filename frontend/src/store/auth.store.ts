import { AuthSession, User } from '@/types/auth';
import { STORAGE_KEYS } from '@/lib/constants';

type Listener = (state: AuthSession) => void;

class AuthStore {
  private state: AuthSession = {
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
  };

  private listeners = new Set<Listener>();

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
        const storedToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
        const storedRefresh = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

        this.state = {
          user: storedUser ? JSON.parse(storedUser) : null,
          accessToken: storedToken ? JSON.parse(storedToken) : null,
          refreshToken: storedRefresh ? JSON.parse(storedRefresh) : null,
          isAuthenticated: !!storedToken,
        };
      } catch (e) {
        console.error('Failed to initialize AuthStore from localStorage:', e);
      }
    }
  }

  getState(): AuthSession {
    return this.state;
  }

  setState(nextState: Partial<AuthSession>): void {
    this.state = { ...this.state, ...nextState };
    this.notify();
  }

  setSession(user: User, accessToken: string, refreshToken: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, JSON.stringify(accessToken));
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, JSON.stringify(refreshToken));
    }
    this.setState({
      user,
      accessToken,
      refreshToken,
      isAuthenticated: true,
    });
  }

  clearSession(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.USER);
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    }
    this.setState({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    });
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
