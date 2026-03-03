'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { updateUser } from '@/lib/auth';
import Input from '@/app/components/Input';
import Button from '@/app/components/Button';

export default function ProfilePage() {
  const { user, updateUser: updateAuth } = useAuth();
  const [form, setForm] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setForm({ name: user.name, email: user.email });
    }
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const updated = await updateUser(user.id, { name: form.name, email: form.email });
      if (updated) {
        updateAuth(updated);
        setMessage('Profile updated successfully');
      }
    } catch (e) {
      setMessage('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      {message && <p className="mb-4 text-sm text-green-600">{message}</p>}
      <div className="max-w-md space-y-4">
        <Input
          label="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Input
          label="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <Button onClick={handleSave} loading={loading} fullWidth>
          Save Changes
        </Button>
      </div>
    </div>
  );
}
