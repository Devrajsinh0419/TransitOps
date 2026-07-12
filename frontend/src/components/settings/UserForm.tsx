'use client';

import React from 'react';
import { User, UserRole, UserStatus } from '@/types/settings';
import { Button } from '../ui/Button';
import { Save, X, User as UserIcon } from 'lucide-react';
import { toast } from 'sonner';

interface UserFormProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null; // Null when creating a user
  onSave: (data: Partial<User>) => Promise<boolean>;
}

export function UserForm({ isOpen, onClose, user, onSave }: UserFormProps) {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [department, setDepartment] = React.useState('Operations');
  const [role, setRole] = React.useState<UserRole>('viewer');
  const [status, setStatus] = React.useState<UserStatus>('active');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Sync state with selected user if editing
  React.useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setPhone(user.phone);
      setDepartment(user.department);
      setRole(user.role);
      setStatus(user.status);
    } else {
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setDepartment('Operations');
      setRole('viewer');
      setStatus('active');
    }
  }, [user, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email) {
      toast.error('First Name, Last Name, and Email are required.');
      return;
    }

    setIsSubmitting(true);
    const payload: Partial<User> = {
      firstName,
      lastName,
      email,
      phone,
      department,
      role,
      status,
    };
    const success = await onSave(payload);
    setIsSubmitting(false);
    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm select-none">
      <div className="w-full max-w-lg border border-border/50 bg-card rounded-2xl shadow-xl overflow-hidden text-left relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-border/30 flex items-center justify-between">
          <h3 className="text-xs font-black uppercase tracking-wider text-foreground flex items-center gap-1.5">
            <UserIcon className="h-4 w-4 text-primary" />
            {user ? 'Modify Operator Profile' : 'Register New System Operator'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* First Name */}
            <div className="space-y-1 text-xs">
              <label className="font-bold text-muted-foreground uppercase text-[10px]">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="h-10 w-full rounded-lg border border-border/60 bg-muted/10 px-3 font-semibold text-foreground focus:border-primary focus:outline-none"
                placeholder="Jane"
              />
            </div>

            {/* Last Name */}
            <div className="space-y-1 text-xs">
              <label className="font-bold text-muted-foreground uppercase text-[10px]">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="h-10 w-full rounded-lg border border-border/60 bg-muted/10 px-3 font-semibold text-foreground focus:border-primary focus:outline-none"
                placeholder="Doe"
              />
            </div>

            {/* Email */}
            <div className="space-y-1 text-xs">
              <label className="font-bold text-muted-foreground uppercase text-[10px]">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 w-full rounded-lg border border-border/60 bg-muted/10 px-3 font-semibold text-foreground focus:border-primary focus:outline-none"
                placeholder="jane.doe@transitops.com"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1 text-xs">
              <label className="font-bold text-muted-foreground uppercase text-[10px]">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-10 w-full rounded-lg border border-border/60 bg-muted/10 px-3 font-semibold text-foreground focus:border-primary focus:outline-none"
                placeholder="+1 (555) 302-8812"
              />
            </div>

            {/* Department */}
            <div className="space-y-1 text-xs">
              <label className="font-bold text-muted-foreground uppercase text-[10px]">Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="h-10 w-full rounded-lg border border-border/60 bg-muted/10 px-3 font-semibold text-foreground focus:border-primary focus:outline-none cursor-pointer"
              >
                <option value="Operations">Operations</option>
                <option value="Logistics">Logistics</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Safety Compliance">Safety Compliance</option>
              </select>
            </div>

            {/* Access Role */}
            <div className="space-y-1 text-xs">
              <label className="font-bold text-muted-foreground uppercase text-[10px]">System Access Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="h-10 w-full rounded-lg border border-border/60 bg-muted/10 px-3 font-semibold text-foreground focus:border-primary focus:outline-none cursor-pointer"
              >
                <option value="admin">Administrator</option>
                <option value="fleet_manager">Fleet Manager</option>
                <option value="safety_officer">Safety Officer</option>
                <option value="viewer">Viewer</option>
              </select>
            </div>

            {/* Status */}
            <div className="space-y-1 text-xs sm:col-span-2">
              <label className="font-bold text-muted-foreground uppercase text-[10px]">User Account Status</label>
              <div className="flex gap-4 pt-1">
                {['active', 'inactive', 'suspended'].map((s) => (
                  <label key={s} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="user-status"
                      checked={status === s}
                      onChange={() => setStatus(s as UserStatus)}
                      className="text-primary focus:ring-0 cursor-pointer h-4 w-4"
                    />
                    <span className="font-semibold text-foreground uppercase text-[10px]">{s}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>

          {/* Footer Save Button */}
          <div className="flex justify-end gap-2 pt-4 border-t border-border/10">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="h-9 text-xs font-semibold rounded-lg px-4 border-border/60"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={isSubmitting}
              className="h-9 text-xs font-extrabold bg-primary hover:bg-primary/95 text-primary-foreground rounded-lg px-6 gap-1.5"
              leftIcon={<Save className="h-3.5 w-3.5" />}
            >
              {user ? 'Save Changes' : 'Register Operator'}
            </Button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default UserForm;
