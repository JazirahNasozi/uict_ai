'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { registerUser } from '@/lib/auth';
import Button from '@/app/components/Button';
import Input from '@/app/components/Input';
import Card from '@/app/components/Card';
import { UserRole } from '@/lib/types';

export default function RegisterPage() {
  const router = useRouter();
  const { login, user, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    schoolName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.schoolName) newErrors.schoolName = 'School name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  React.useEffect(() => {
    if (!isLoading && user) {
      router.replace('/dashboard');
    }
  }, [user, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setGeneralError('');
    try {
      const payload = {
        name: formData.schoolName,
        email: formData.email,
        role: 'student' as UserRole,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      };
      const user = await registerUser(payload as any);
      if (user) {
        login(user);
        router.push('/dashboard');
      }
    } catch (error: any) {
      setGeneralError(error.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="w-full max-w-sm md:max-w-md p-4">
      <Card className="w-full shadow-lg rounded-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image
              src="/peral-logo.png"
              alt="Pearl Labs UICT AI Logo"
              width={140}
              height={140}
            />
          </div>
           <h1 className="text-2xl font-bold text-gray-900 mb-2">
         Pearl Labs UICT AI
          </h1>
          <h2 className="text-2xl  text-gray-900 mb-2">Create Your Account</h2>
          <p className="text-gray-600 text-sm">Join the professional AI learning platform for schools.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {generalError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {generalError}
            </div>
          )}


          <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    School Name
  </label>

  <select
    value={formData.schoolName}
    onChange={(e) =>
      setFormData({ ...formData, schoolName: e.target.value })
    }
    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="">Select your school</option>
    <option value="UICT">Uganda Institute of Information and Communications Technology (UICT)</option>
    <option value="Makerere">Makerere University</option>
    <option value="Kyambogo">Kyambogo University</option>
    <option value="MUBS">Makerere University Business School</option>
  </select>

  {errors.schoolName && (
    <p className="text-sm text-red-500 mt-1">{errors.schoolName}</p>
  )}
</div>

          <Input
            label="Official Email"
            type="email"
            placeholder="name@school.edu"
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

          <Input
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            error={errors.confirmPassword}
          />

          <Button type="button" variant="secondary" size="md" fullWidth onClick={() => alert('Google sign-in not implemented')}>
            Continue with Google
          </Button>

          <Button type="submit" variant="success" size="md" fullWidth loading={loading}>
            {loading ? 'Creating account...' : 'Sign Up for Free'}
          </Button>

          <div className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 font-medium hover:underline">
              Sign in
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
