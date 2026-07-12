'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authStore } from '@/store/auth.store';
import { User as UserIcon, LogOut, Settings, ShieldAlert, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface ProfileDropdownProps {
  className?: string;
}

export function ProfileDropdown({ className }: ProfileDropdownProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [authSession, setAuthSession] = useState(authStore.getState());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const unsubscribe = authStore.subscribe((state) => setAuthSession(state));
    return unsubscribe;
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    authStore.clearSession();
    router.push('/login');
  };

  const user = authSession.user;

  return (
    <div ref={containerRef} className={cn('relative select-none', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-1.5 py-1 rounded-xl hover:bg-muted/65 transition-colors cursor-pointer text-left"
      >
        <div className="flex h-9.5 w-9.5 items-center justify-center rounded-xl bg-muted border border-border text-muted-foreground overflow-hidden shrink-0">
          {mounted && user?.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.avatarUrl} alt={user.name} className="h-full w-full object-cover" />
          ) : (
            <UserIcon className="h-4.5 w-4.5 text-muted-foreground" />
          )}
        </div>
        <div className="hidden md:flex flex-col max-w-[100px]">
          <span className="text-xs font-semibold text-foreground truncate">
            {mounted && user ? user.name : 'Guest User'}
          </span>
          <span className="text-[9px] font-medium text-muted-foreground uppercase tracking-wider truncate">
            {mounted && user ? user.role.replace('_', ' ') : 'Viewer'}
          </span>
        </div>
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground/60 hidden md:block" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 z-50 mt-1.5 w-48 bg-popover text-popover-foreground border border-border rounded-xl shadow-premium overflow-hidden"
          >
            <div className="p-3 border-b border-border/60 bg-muted/15 flex flex-col">
              <span className="text-xs font-bold text-foreground truncate">{mounted && user?.name || 'Guest User'}</span>
              <span className="text-[10px] text-muted-foreground truncate mt-0.5">{mounted && user?.email || 'guest@transitops.com'}</span>
            </div>

            <div className="p-1 space-y-0.5">
              <button
                onClick={() => {
                  setIsOpen(false);
                  router.push('/profile');
                }}
                className="flex items-center gap-2.5 w-full px-2.5 py-1.5 rounded-lg text-xs font-medium hover:bg-muted text-foreground transition-colors cursor-pointer"
              >
                <UserIcon className="h-4 w-4 text-muted-foreground" />
                Profile
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  router.push('/settings');
                }}
                className="flex items-center gap-2.5 w-full px-2.5 py-1.5 rounded-lg text-xs font-medium hover:bg-muted text-foreground transition-colors cursor-pointer"
              >
                <Settings className="h-4 w-4 text-muted-foreground" />
                Settings
              </button>
            </div>

            <div className="p-1 border-t border-border/60">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2.5 w-full px-2.5 py-1.5 rounded-lg text-xs font-semibold hover:bg-destructive/10 text-destructive transition-colors cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProfileDropdown;
