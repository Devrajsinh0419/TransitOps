'use client';

import React from 'react';
import { Button } from '../ui/Button';
import { Shield, Key, Eye, EyeOff, Save, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export function SecurityCard() {
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [showPass, setShowPass] = React.useState(false);
  const [mfaEnabled, setMfaEnabled] = React.useState(false);
  const [sessionTimeout, setSessionTimeout] = React.useState('30');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('All password fields are required.');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match.');
      return;
    }
    if (newPassword.length < 8) {
      toast.error('New password must be at least 8 characters long.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      toast.success('Your sign-in password was updated successfully!');
    }, 600);
  };

  // Password strength logic
  const getStrengthScore = () => {
    if (!newPassword) return { label: 'Empty', color: 'bg-muted', pct: 0 };
    let score = 0;
    if (newPassword.length >= 8) score += 1;
    if (/[A-Z]/.test(newPassword)) score += 1;
    if (/[0-9]/.test(newPassword)) score += 1;
    if (/[^A-Za-z0-9]/.test(newPassword)) score += 1;

    switch (score) {
      case 1:
        return { label: 'Weak', color: 'bg-rose-500', pct: 25 };
      case 2:
        return { label: 'Fair', color: 'bg-amber-500', pct: 50 };
      case 3:
        return { label: 'Good', color: 'bg-indigo-500', pct: 75 };
      case 4:
        return { label: 'Strong', color: 'bg-emerald-500', pct: 100 };
      default:
        return { label: 'Weak', color: 'bg-rose-500', pct: 25 };
    }
  };

  const strength = getStrengthScore();

  return (
    <div className="space-y-6 select-none text-left">
      
      {/* Password reset form */}
      <form onSubmit={handlePasswordChange} className="p-6 border border-border/50 bg-card rounded-2xl shadow-sm space-y-4">
        <h3 className="text-xs font-black uppercase tracking-wider text-foreground pb-2 border-b border-border/30 flex items-center gap-1.5">
          <Key className="h-4 w-4 text-primary" />
          Update Security Password
        </h3>

        <div className="space-y-3">
          {/* Current Password */}
          <div className="space-y-1 text-xs">
            <label className="font-bold text-muted-foreground uppercase text-[10px]">Current Password</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="h-10 w-full rounded-lg border border-border/60 bg-muted/10 px-3 font-semibold text-foreground focus:border-primary focus:outline-none"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3.5 top-3.5 text-muted-foreground hover:text-foreground"
              >
                {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-1 text-xs">
            <label className="font-bold text-muted-foreground uppercase text-[10px]">New Password</label>
            <input
              type={showPass ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="h-10 w-full rounded-lg border border-border/60 bg-muted/10 px-3 font-semibold text-foreground focus:border-primary focus:outline-none"
              placeholder="Minimum 8 characters"
            />
          </div>

          {/* Password strength visualizer */}
          {newPassword && (
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[10px]">
                <span className="font-bold text-muted-foreground uppercase">Password Strength</span>
                <span className="font-black text-foreground uppercase">{strength.label}</span>
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <div className={`h-full ${strength.color} transition-all duration-300`} style={{ width: `${strength.pct}%` }} />
              </div>
            </div>
          )}

          {/* Confirm Password */}
          <div className="space-y-1 text-xs">
            <label className="font-bold text-muted-foreground uppercase text-[10px]">Confirm New Password</label>
            <input
              type={showPass ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="h-10 w-full rounded-lg border border-border/60 bg-muted/10 px-3 font-semibold text-foreground focus:border-primary focus:outline-none"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            isLoading={isSubmitting}
            className="h-9 text-xs font-extrabold bg-primary hover:bg-primary/95 text-primary-foreground rounded-lg px-4"
          >
            Change Password
          </Button>
        </div>
      </form>

      {/* Two factor authentication options */}
      <div className="p-6 border border-border/50 bg-card rounded-2xl shadow-sm space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-border/30">
          <h3 className="text-xs font-black uppercase tracking-wider text-foreground flex items-center gap-1.5">
            <Shield className="h-4 w-4 text-emerald-500" />
            Two-Factor Authentication (MFA)
          </h3>
          <div className="relative inline-flex items-center cursor-pointer select-none">
            <input
              type="checkbox"
              checked={mfaEnabled}
              onChange={(e) => {
                setMfaEnabled(e.target.checked);
                toast.success(e.target.checked ? 'MFA enrollment process started' : 'MFA disabled');
              }}
              className="sr-only peer"
              id="mfa-toggle"
            />
            <label
              htmlFor="mfa-toggle"
              className="w-8 h-4 bg-muted-foreground/30 rounded-full peer peer-focus:ring-0 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-primary cursor-pointer"
            />
          </div>
        </div>

        <p className="text-[10px] text-muted-foreground leading-normal font-medium">
          Secure your administrator profile by requiring an OTP authenticator code (e.g. Google Authenticator or Microsoft Authenticator) alongside standard credentials.
        </p>
      </div>

      {/* Session timeout controls */}
      <div className="p-6 border border-border/50 bg-card rounded-2xl shadow-sm space-y-4">
        <h3 className="text-xs font-black uppercase tracking-wider text-foreground pb-2 border-b border-border/30 flex items-center gap-1.5">
          <AlertCircle className="h-4 w-4 text-primary" />
          Automatic Session Timeout
        </h3>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-[10px] text-muted-foreground max-w-sm font-medium leading-normal">
            Automatically log out inactive operators after a specified inactivity duration to prevent unauthorized terminal access.
          </p>

          <select
            value={sessionTimeout}
            onChange={(e) => {
              setSessionTimeout(e.target.value);
              toast.success(`Inactivity timeout set to ${e.target.value} minutes`);
            }}
            className="h-10 w-full sm:w-40 rounded-lg border border-border/60 bg-muted/10 px-3 font-semibold text-foreground focus:border-primary focus:outline-none text-xs"
          >
            <option value="15">15 Minutes</option>
            <option value="30">30 Minutes</option>
            <option value="60">1 Hour</option>
            <option value="240">4 Hours</option>
          </select>
        </div>
      </div>

    </div>
  );
}

export default SecurityCard;
