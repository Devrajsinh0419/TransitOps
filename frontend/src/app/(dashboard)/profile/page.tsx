'use client';

import React, { useState } from 'react';
import { PageContainer } from '@/components/layouts/PageContainer';
import { PageHeader } from '@/components/layouts/PageHeader';
import { FormField } from '@/components/forms/FormField';
import { Input } from '@/components/forms/Input';
import { Button } from '@/components/ui/Button';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { useProfile } from '@/hooks/useProfile';
import { User, Key, Save } from 'lucide-react';
import { toast } from 'sonner';

export default function ProfilePage() {
  const { profile, isLoading, updateProfile, changePassword } = useProfile();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  React.useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName || '');
      setLastName(profile.lastName || '');
      setEmail(profile.email || '');
    }
  }, [profile]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email) {
      toast.error('Validation Error', { description: 'All profile fields are required.' });
      return;
    }
    await updateProfile({ firstName, lastName, email });
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error('Validation Error', { description: 'All password fields are required.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Validation Error', { description: 'New password and confirm password do not match.' });
      return;
    }
    if (newPassword.length < 8) {
      toast.error('Validation Error', { description: 'New password must be at least 8 characters long.' });
      return;
    }

    const success = await changePassword({
      oldPassword,
      newPassword,
    });
    if (success) {
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  if (isLoading && !profile) {
    return (
      <PageContainer>
        <div className="flex h-[400px] items-center justify-center">
          <div className="text-sm text-muted-foreground">Loading profile details...</div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader
        title="My Profile"
        description="Manage your account information, contact credentials, and session credentials"
      />

      <div className="grid gap-6 max-w-4xl mx-auto lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-6">
          <div className="border border-border bg-card rounded-2xl p-6 shadow-soft text-center animate-fade-in">
            <div className="mx-auto h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <User className="h-10 w-10 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground text-lg">
              {profile?.firstName} {profile?.lastName}
            </h3>
            <p className="text-xs text-muted-foreground mb-4">@{profile?.role?.replace('_', ' ')}</p>
            <div className="text-left text-xs space-y-2 border-t border-border/60 pt-4 text-muted-foreground">
              <div>Role: <span className="font-medium text-foreground">{profile?.role}</span></div>
              <div>Email: <span className="font-medium text-foreground">{profile?.email}</span></div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="border border-border bg-card rounded-2xl p-6 shadow-soft">
            <div className="flex items-center gap-3 pb-4 border-b border-border/60 mb-5">
              <User className="h-5 w-5 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground text-base">Account Details</h3>
                <p className="text-xs text-muted-foreground font-normal">Update your name and email address</p>
              </div>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="First Name" required>
                  <Input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Sarah"
                  />
                </FormField>
                <FormField label="Last Name" required>
                  <Input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Jenkins"
                  />
                </FormField>
              </div>

              <FormField label="Email Address" required>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sjenkins@transitops.com"
                />
              </FormField>

              <div className="flex justify-end pt-2">
                <Button type="submit" variant="primary" size="sm" className="cursor-pointer font-semibold">
                  <Save className="mr-1.5 h-3.5 w-3.5" />
                  Save Changes
                </Button>
              </div>
            </form>
          </div>

          <div className="border border-border bg-card rounded-2xl p-6 shadow-soft">
            <div className="flex items-center gap-3 pb-4 border-b border-border/60 mb-5">
              <Key className="h-5 w-5 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground text-base">Security Settings</h3>
                <p className="text-xs text-muted-foreground font-normal">Configure a secure new password for your account</p>
              </div>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <FormField label="Current Password" required>
                <PasswordInput
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </FormField>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="New Password" required>
                  <PasswordInput
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                </FormField>
                <FormField label="Confirm New Password" required>
                  <PasswordInput
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                </FormField>
              </div>

              <div className="flex justify-end pt-2">
                <Button type="submit" variant="primary" size="sm" className="cursor-pointer font-semibold">
                  <Save className="mr-1.5 h-3.5 w-3.5" />
                  Update Password
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
