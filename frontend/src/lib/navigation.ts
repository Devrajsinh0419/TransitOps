import { ROUTES } from './routes';

export function isActiveRoute(currentPath: string, targetPath: string, exact = false): boolean {
  if (exact) {
    return currentPath === targetPath;
  }
  
  if (targetPath === ROUTES.DASHBOARD.HOME) {
    return currentPath === targetPath;
  }
  
  return currentPath.startsWith(targetPath);
}
