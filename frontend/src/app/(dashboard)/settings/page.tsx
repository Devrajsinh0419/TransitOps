'use client';

import React from 'react';
import { SettingsHeader, SettingsCard } from '@/components/settings';

export default function SettingsIndexPage() {
  const cards = [
    { title: 'My Profile', description: 'Update bio, contact phone, department details, emergency numbers, and avatar uploads.', href: '/settings/profile', iconName: 'user' },
    { title: 'Account Settings', description: 'View current login IP logs, active connected browsers, and credential keys.', href: '/settings/account', iconName: 'shield' },
    { title: 'Sign-in & Passwords', description: 'Reset your passwords, manage trusted MFA devices, and inactivity limits.', href: '/settings/security', iconName: 'key' },
    { title: 'Fleet Configurations', description: 'Define custom vehicle classes, fuel type labels, ledger classifications, and currencies.', href: '/settings/fleet', iconName: 'truck' },
    { title: 'Users Directory', description: 'Provision access privileges, suspend operators, and edit department titles.', href: '/settings/users', iconName: 'users' },
    { title: 'System Roles', description: 'Summarize user limits, description badges, and administrative classifications.', href: '/settings/roles', iconName: 'shield-alert' },
    { title: 'Access Permissions', description: 'Synchronize the read, write, export, and approval spreadsheet policies.', href: '/settings/permissions', iconName: 'shield' },
    { title: 'Notification Settings', description: 'Tune in-app, push, and email alert channels across dispatch workflows.', href: '/settings/notifications', iconName: 'bell' },
    { title: 'Visual Appearance', description: 'Toggle light and dark modes, resize typography, and pick accent colors.', href: '/settings/appearance', iconName: 'eye' },
    { title: 'About Application', description: 'Check build codes, core software updates, license info, and documents.', href: '/settings/about', iconName: 'info' },
  ];

  return (
    <div className="space-y-6 select-none text-left">
      <SettingsHeader title="Dashboard Home" />

      {/* Grid of settings cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <SettingsCard
            key={card.href}
            title={card.title}
            description={card.description}
            href={card.href}
            iconName={card.iconName}
          />
        ))}
      </div>
    </div>
  );
}
