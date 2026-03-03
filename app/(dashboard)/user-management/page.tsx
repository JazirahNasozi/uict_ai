'use client';

import React, { useEffect, useState } from 'react';
import { getAllUsers, updateUser } from '@/lib/auth';
import { User } from '@/lib/types';
import Card from '@/app/components/Card';
import Input from '@/app/components/Input';

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const all = await getAllUsers();
    setUsers(all);
  };

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStatus = async (user: User) => {
    const updated = await updateUser(user.id, {
      status: user.status === 'active' ? 'inactive' : 'active',
    });
    if (updated) fetchUsers();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      <div className="max-w-md mb-6">
        <Input
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="space-y-3">
        {filtered.map((u) => (
          <Card key={u.id} className="flex justify-between items-center">
            <div>
              <div className="font-medium">{u.name}</div>
              <div className="text-sm text-gray-500">{u.email}</div>
            </div>
            <button
              onClick={() => toggleStatus(u)}
              className={`px-3 py-1 rounded-full text-xs ${
                u.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}
            >
              {u.status}
            </button>
          </Card>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Add New User</button>
      </div>
    </div>
  );
}
