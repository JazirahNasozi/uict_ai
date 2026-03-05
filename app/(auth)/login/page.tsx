'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { loginUser, DEMO_CREDENTIALS } from '@/lib/auth';
import Button from '@/app/components/Button';
import Input from '@/app/components/Input';
import Card from '@/app/components/Card';

export default function LoginPage() {
  const router = useRouter();
  const { login, user, isLoading } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setGeneralError('');
    try {
      const user = await loginUser(formData);
      if (user) {
        login(user);
        router.push('/dashboard');
      } else {
        setGeneralError('Invalid email or password. Try: student@uict.ac.ug / password123');
      }
    } catch (error) {
      setGeneralError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // redirect if already logged in
  React.useEffect(() => {
    if (!isLoading && user) {
      router.replace('/dashboard');
    }
  }, [user, isLoading, router]);

  const handleDemoLogin = async (role: 'student' | 'lecturer' | 'admin') => {
    setLoading(true);
    const creds = DEMO_CREDENTIALS[role];
    setFormData(creds);
    try {
      const user = await loginUser(creds);
      if (user) {
        login(user);
        router.push('/dashboard');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
  <div className="w-full max-w-sm md:max-w-md p-4">
      <Card className="w-full shadow-lg rounded-xl">
        {/* Logo */}
<div className="text-center mb-8">
  <div className="flex justify-center mb-4">
    <Image
      src="/peral-logo.png"
      alt="Pearl Labs UICT AI Logo"
      width={100}
      height={100}
    />
  </div>

  <h1 className="text-2xl font-bold text-gray-900 mb-2">
    Pearl Labs UICT AI
  </h1>

  <p className="text-gray-600 text-sm">
    Log in to your professional AI learning dashboard
  </p>
</div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {generalError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {generalError}
            </div>
          )}

          <Input
            label="Email address"
            type="email"
            placeholder="name@email.edu"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            error={errors.password}
          />

          <Button type="button" variant="secondary" size="md" fullWidth onClick={() => alert('Google sign-in not implemented')}>
            Continue with Google
          </Button>

          <Button type="submit" variant="primary" size="md" fullWidth loading={loading}>
            {loading ? 'Signing in...' : 'Log In to Pearl_labs uict AI'}
          </Button>

          <div className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/register" className="text-blue-600 font-medium hover:underline">
              Sign up for free
            </Link>
          </div>
        </form>

        {/* Footer Links */}
        <div className="mt-6 pt-6 border-t border-gray-200 text-center text-xs text-gray-500 space-y-1">
          <div>Privacy Policy • Terms of Service • Cookie Settings</div>
        </div>
      </Card>
    </div>
    </div>
  );
}
