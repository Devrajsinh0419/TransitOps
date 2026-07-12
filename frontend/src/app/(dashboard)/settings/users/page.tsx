'use client';

import React from 'react';
import { useUsers } from '@/hooks/useUsers';
import { User } from '@/types/settings';
import {
  SettingsHeader,
  SettingsSidebar,
  UserToolbar,
  UserTable,
  UserForm,
  SettingsSkeleton,
} from '@/components/settings';

export default function UsersDirectorySettingsPage() {
  const { users, isLoading, createUser, updateUser, deleteUser } = useUsers();
  
  const [search, setSearch] = React.useState('');
  const [roleFilter, setRoleFilter] = React.useState('');
  const [deptFilter, setDeptFilter] = React.useState('');
  
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingUser, setEditingUser] = React.useState<User | null>(null);

  if (isLoading) {
    return <SettingsSkeleton />;
  }

  // Filtered dataset
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      `${u.firstName} ${u.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    
    const matchesRole = !roleFilter || u.role === roleFilter;
    const matchesDept = !deptFilter || u.department === deptFilter;

    return matchesSearch && matchesRole && matchesDept;
  });

  const handleEditClick = (user: User) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const handleAddClick = () => {
    setEditingUser(null);
    setIsFormOpen(true);
  };

  const handleSave = async (payload: Partial<User>) => {
    if (editingUser) {
      return await updateUser(editingUser.id, payload);
    } else {
      return await createUser(payload);
    }
  };

  return (
    <div className="space-y-6 select-none text-left">
      <SettingsHeader title="Users Directory" />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <SettingsSidebar />

        {/* Content body */}
        <div className="flex-1 space-y-4">
          <UserToolbar
            search={search}
            onSearchChange={setSearch}
            roleFilter={roleFilter}
            onRoleFilterChange={setRoleFilter}
            deptFilter={deptFilter}
            onDeptFilterChange={setDeptFilter}
            onAddClick={handleAddClick}
          />

          <UserTable
            users={filteredUsers}
            onEdit={handleEditClick}
            onDelete={deleteUser}
          />
        </div>
      </div>

      {/* Operator Add/Edit Dialog */}
      <UserForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        user={editingUser}
        onSave={handleSave}
      />
    </div>
  );
}
