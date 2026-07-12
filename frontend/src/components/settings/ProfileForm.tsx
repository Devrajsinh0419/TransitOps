'use client';

import React from 'react';
import { Profile } from '@/types/settings';
import { Button } from '../ui/Button';
import { Save, User, Globe, Phone, MapPin, HeartHandshake } from 'lucide-react';
import { toast } from 'sonner';

interface ProfileFormProps {
  initialData: Profile;
  onSave: (data: Partial<Profile>) => Promise<boolean>;
  isLoading: boolean;
}

export function ProfileForm({ initialData, onSave, isLoading }: ProfileFormProps) {
  const [formData, setFormData] = React.useState<Profile>(initialData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName) {
      toast.error('First and Last name fields are mandatory.');
      return;
    }
    await onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 border border-border/50 bg-card rounded-2xl shadow-sm space-y-6 select-none text-left">
      <h3 className="text-xs font-black uppercase tracking-wider text-foreground pb-2 border-b border-border/30 flex items-center gap-1.5">
        <User className="h-4 w-4 text-primary" />
        Personal Information Form
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* First Name */}
        <div className="space-y-1.5 text-xs">
          <label className="font-bold text-muted-foreground uppercase text-[10px]">First Name</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="h-10 w-full rounded-lg border border-border/60 bg-muted/10 px-3 font-semibold text-foreground focus:border-primary focus:outline-none"
            placeholder="John"
          />
        </div>

        {/* Last Name */}
        <div className="space-y-1.5 text-xs">
          <label className="font-bold text-muted-foreground uppercase text-[10px]">Last Name</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="h-10 w-full rounded-lg border border-border/60 bg-muted/10 px-3 font-semibold text-foreground focus:border-primary focus:outline-none"
            placeholder="Doe"
          />
        </div>

        {/* Email */}
        <div className="space-y-1.5 text-xs">
          <label className="font-bold text-muted-foreground uppercase text-[10px]">Email Address</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="h-10 w-full rounded-lg border border-border/60 bg-muted/10 px-3 font-semibold text-foreground focus:border-primary focus:outline-none"
            placeholder="john.doe@transitops.com"
          />
        </div>

        {/* Phone */}
        <div className="space-y-1.5 text-xs">
          <label className="font-bold text-muted-foreground uppercase text-[10px]">Phone Number</label>
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="h-10 w-full rounded-lg border border-border/60 bg-muted/10 px-3 font-semibold text-foreground focus:border-primary focus:outline-none"
            placeholder="+1 (555) 000-0000"
          />
        </div>
      </div>

      <h3 className="text-xs font-black uppercase tracking-wider text-foreground pt-4 pb-2 border-b border-border/30 flex items-center gap-1.5">
        <Globe className="h-4 w-4 text-primary" />
        Regional Preferences & Location
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Language */}
        <div className="space-y-1.5 text-xs">
          <label className="font-bold text-muted-foreground uppercase text-[10px]">Primary Language</label>
          <select
            value={formData.language}
            onChange={(e) => setFormData({ ...formData, language: e.target.value })}
            className="h-10 w-full rounded-lg border border-border/60 bg-muted/10 px-3 font-semibold text-foreground focus:border-primary focus:outline-none"
          >
            <option value="en">English (US)</option>
            <option value="es">Español (ES)</option>
            <option value="fr">Français (FR)</option>
          </select>
        </div>

        {/* Timezone */}
        <div className="space-y-1.5 text-xs">
          <label className="font-bold text-muted-foreground uppercase text-[10px]">Operational Timezone</label>
          <select
            value={formData.timezone}
            onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
            className="h-10 w-full rounded-lg border border-border/60 bg-muted/10 px-3 font-semibold text-foreground focus:border-primary focus:outline-none"
          >
            <option value="America/New_York">Eastern Time (ET)</option>
            <option value="America/Chicago">Central Time (CT)</option>
            <option value="America/Denver">Mountain Time (MT)</option>
            <option value="America/Los_Angeles">Pacific Time (PT)</option>
          </select>
        </div>

        {/* Physical Address */}
        <div className="space-y-1.5 text-xs sm:col-span-2">
          <label className="font-bold text-muted-foreground uppercase text-[10px]">Physical Address</label>
          <div className="relative">
            <input
              type="text"
              value={formData.address || ''}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="h-10 w-full rounded-lg border border-border/60 bg-muted/10 pl-10 pr-3 font-semibold text-foreground focus:border-primary focus:outline-none"
              placeholder="123 Main St, City, State"
            />
            <MapPin className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground/60" />
          </div>
        </div>
      </div>

      <h3 className="text-xs font-black uppercase tracking-wider text-foreground pt-4 pb-2 border-b border-border/30 flex items-center gap-1.5">
        <HeartHandshake className="h-4 w-4 text-primary" />
        Emergency Info & Bio
      </h3>

      <div className="space-y-4">
        {/* Emergency Contact */}
        <div className="space-y-1.5 text-xs">
          <label className="font-bold text-muted-foreground uppercase text-[10px]">Emergency Contact</label>
          <div className="relative">
            <input
              type="text"
              value={formData.emergencyContact || ''}
              onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
              className="h-10 w-full rounded-lg border border-border/60 bg-muted/10 pl-10 pr-3 font-semibold text-foreground focus:border-primary focus:outline-none"
              placeholder="Jane Doe (+1 555-123-4567)"
            />
            <Phone className="absolute left-3.5 top-3.5 h-3.5 w-3.5 text-muted-foreground/60" />
          </div>
        </div>

        {/* Short Biography */}
        <div className="space-y-1.5 text-xs">
          <label className="font-bold text-muted-foreground uppercase text-[10px]">Short Biography</label>
          <textarea
            value={formData.bio || ''}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="w-full h-24 rounded-lg border border-border/60 bg-muted/10 p-3 font-medium text-foreground focus:border-primary focus:outline-none resize-none leading-relaxed"
            placeholder="Introduce yourself to the dispatch team..."
          />
        </div>
      </div>

      {/* Form Submission Button */}
      <div className="flex justify-end pt-4 border-t border-border/20">
        <Button
          type="submit"
          isLoading={isLoading}
          className="h-10 text-xs font-extrabold bg-primary hover:bg-primary/95 text-primary-foreground rounded-lg px-6 gap-2 shadow-sm"
          leftIcon={<Save className="h-4 w-4" />}
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
}

export default ProfileForm;
