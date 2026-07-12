export type SidebarMode = 'expanded' | 'collapsed' | 'compact';

export interface UiState {
  sidebarOpen: boolean;
  sidebarMode: SidebarMode;
  notificationsOpen: boolean;
  activeDialog: string | null;
}

type Listener = (state: UiState) => void;

class UiStore {
  private state: UiState = {
    sidebarOpen: true,
    sidebarMode: 'expanded',
    notificationsOpen: false,
    activeDialog: null,
  };

  private listeners = new Set<Listener>();

  getState(): UiState {
    return this.state;
  }

  setState(nextState: Partial<UiState>): void {
    this.state = { ...this.state, ...nextState };
    this.notify();
  }

  toggleSidebar(): void {
    this.setState({ sidebarOpen: !this.state.sidebarOpen });
  }

  setSidebarOpen(open: boolean): void {
    this.setState({ sidebarOpen: open });
  }

  setSidebarMode(mode: SidebarMode): void {
    this.setState({
      sidebarMode: mode,
      sidebarOpen: mode !== 'collapsed',
    });
  }

  toggleNotifications(): void {
    this.setState({ notificationsOpen: !this.state.notificationsOpen });
  }

  setNotificationsOpen(open: boolean): void {
    this.setState({ notificationsOpen: open });
  }

  openDialog(dialogId: string): void {
    this.setState({ activeDialog: dialogId });
  }

  closeDialog(): void {
    this.setState({ activeDialog: null });
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

export const uiStore = new UiStore();
export default uiStore;
