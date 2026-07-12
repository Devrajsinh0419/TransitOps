'use client';

import { useState, useEffect } from 'react';
import { User } from '@/types/settings';
import { toast } from 'sonner';

export const activeUsers: User[] = [
  { id: 'usr-1', firstName: 'Sarah', lastName: 'Jenkins', email: 'sjenkins@transitops.com', phone: '+1 (555) 912-3847', role: 'admin', department: 'Operations', status: 'active', createdAt: '2026-01-10', updatedAt: '2026-07-01' },
  { id: 'usr-2', firstName: 'Marcus', lastName: 'Miller', email: 'mmiller@transitops.com', phone: '+1 (555) 304-8842', role: 'viewer', department: 'Logistics', status: 'active', createdAt: '2026-02-12', updatedAt: '2026-06-15' },
  { id: 'usr-3', firstName: 'Robert', lastName: 'Vance', email: 'rvance@transitops.com', phone: '+1 (555) 789-2010', role: 'fleet_manager', department: 'Maintenance', status: 'suspended', createdAt: '2026-03-01', updatedAt: '2026-07-02' },
  { id: 'usr-4', firstName: 'Amanda', lastName: 'Sterling', email: 'asterling@transitops.com', phone: '+1 (555) 441-2900', role: 'safety_officer', department: 'Safety Compliance', status: 'active', createdAt: '2026-04-18', updatedAt: '2026-07-05' },
];

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setUsers([...activeUsers]);
    setIsLoading(false);
  }, []);

  const createUser = async (data: Partial<User>): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const nextId = `usr-${Date.now()}`;
    const newUser: User = {
      id: nextId,
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      email: data.email || '',
      phone: data.phone || '',
      role: data.role || 'viewer',
      department: data.department || 'Operations',
      status: data.status || 'active',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };

    activeUsers.push(newUser);
    setUsers([...activeUsers]);
    toast.success(`User ${newUser.firstName} ${newUser.lastName} has been added successfully.`);
    setIsLoading(false);
    return true;
  };

  const updateUser = async (id: string, data: Partial<User>): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const index = activeUsers.findIndex((u) => u.id === id);
    if (index !== -1) {
      activeUsers[index] = {
        ...activeUsers[index],
        ...data,
        updatedAt: new Date().toISOString().split('T')[0],
      };
      setUsers([...activeUsers]);
      toast.success('User profiles updated successfully!');
    }

    setIsLoading(false);
    return true;
  };

  const deleteUser = async (id: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const index = activeUsers.findIndex((u) => u.id === id);
    if (index !== -1) {
      const deletedUser = activeUsers[index];
      activeUsers.splice(index, 1);
      setUsers([...activeUsers]);
      toast.success(`User ${deletedUser.firstName} has been removed.`);
    }

    setIsLoading(false);
    return true;
  };

  return {
    users,
    isLoading,
    createUser,
    updateUser,
    deleteUser,
  };
}

export default useUsers;
