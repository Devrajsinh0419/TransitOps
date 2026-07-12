import React from 'react';
import { PageContainer } from '@/components/layouts/PageContainer';
import { PageHeader } from '@/components/layouts/PageHeader';
import { User, Save } from 'lucide-react';

export default function ProfilePage() {
  return (
    <PageContainer>
      <PageHeader
        title="My Profile"
        description="Manage your account information, contact credentials, and session credentials"
      >
        <button className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-primary px-3 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer">
          <Save className="h-3.5 w-3.5" />
          Update Profile
        </button>
      </PageHeader>

      <div className="border border-border bg-card rounded-2xl p-6 shadow-soft max-w-3xl mx-auto">
        <div className="flex items-center gap-3 pb-4 border-b border-border/60 mb-5">
          <User className="h-6 w-6 text-primary" />
          <div>
            <h3 className="font-semibold text-foreground text-base">Profile Module Architecture</h3>
            <p className="text-xs text-muted-foreground">Boilerplate configurations for user account detail management</p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2">Available Actions</h4>
              <div className="font-mono text-[10px] text-muted-foreground bg-muted p-2.5 rounded-lg space-y-1.5">
                <div>• Read Session: authStore.getState().user</div>
                <div>• Update Details via authService</div>
                <div>• Sync local storage state</div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2">Type Definitions</h4>
              <div className="font-mono text-[10px] text-muted-foreground bg-muted p-2.5 rounded-lg space-y-1.5">
                <div>• Model: <span className="text-foreground">User</span></div>
                <div>• Roles: <span className="text-foreground">UserRole</span></div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2">Security Rules</h4>
              <div className="font-mono text-[10px] text-muted-foreground bg-muted p-2.5 rounded-lg space-y-1.5">
                <div>• Role Permissions: <span className="text-foreground">ROLE_PERMISSIONS</span></div>
                <div>• Permission Checker: <span className="text-foreground">hasPermission(...)</span></div>
              </div>
            </div>

            <div className="border border-dashed border-border rounded-xl p-4 flex flex-col justify-center items-center text-center">
              <span className="text-[10px] font-semibold text-primary uppercase tracking-widest bg-primary/10 px-2.5 py-1 rounded-full mb-2">
                RBAC Checked
              </span>
              <p className="text-[11px] text-muted-foreground">
                In Step 2, render editable inputs for Name, Email, Password change and Avatar uploads.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
