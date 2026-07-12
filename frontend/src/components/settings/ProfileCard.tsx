'use client';

import React from 'react';
import { Profile } from '@/types/settings';
import { Button } from '../ui/Button';
import { Edit2, ShieldAlert, Phone, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';

interface ProfileCardProps {
  profile: Profile;
}

export function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <div className="p-6 border border-border/50 bg-card rounded-2xl shadow-sm space-y-6 select-none text-left relative overflow-hidden group">
      {/* Decorative colored accent top bar */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-primary" />

      <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between pt-1">
        <div className="flex items-center gap-4">
          <img
            src={profile.avatarUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&q=80'}
            alt={`${profile.firstName} ${profile.lastName}`}
            className="h-16 w-16 rounded-full border border-border/50 object-cover shadow-sm bg-muted"
          />

          <div className="space-y-0.5">
            <h2 className="text-base font-black text-foreground">
              {profile.firstName} {profile.lastName}
            </h2>
            <div className="flex flex-wrap items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-muted-foreground">
              <span className="text-primary">{profile.role}</span>
              <span>•</span>
              <span>{profile.department}</span>
              <span>•</span>
              <span className="bg-muted px-2 py-0.5 rounded-full border border-border/60 text-[8px] font-extrabold text-foreground">
                {profile.employeeId}
              </span>
            </div>
          </div>
        </div>

        <Link href="/settings/profile">
          <Button
            variant="outline"
            size="sm"
            className="h-9 text-xs font-semibold rounded-lg gap-1.5 border-border/60"
            leftIcon={<Edit2 className="h-3.5 w-3.5" />}
          >
            Edit Profile
          </Button>
        </Link>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed italic font-medium">
        "{profile.bio}"
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border/20 text-xs">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Email Contact</span>
          <span className="font-semibold text-foreground flex items-center gap-1.5">
            <Mail className="h-3.5 w-3.5 text-muted-foreground/60" /> {profile.email}
          </span>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Phone Number</span>
          <span className="font-semibold text-foreground flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5 text-muted-foreground/60" /> {profile.phone}
          </span>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Registered Office</span>
          <span className="font-semibold text-foreground flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-muted-foreground/60" /> Houston HQ Depot
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
