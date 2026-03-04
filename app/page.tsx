'use client';

import Image from "next/image";
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

export default function Home() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  // if authenticated send to dashboard
  useEffect(() => {
    if (!isLoading && user) {
      router.replace('/dashboard');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-2xl">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-3xl">D</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">Welcome to Pearl_labs uict AI</h1>
          <p className="text-base sm:text-lg text-gray-600 mb-8">The professional AI learning platform built for schools and institutions</p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-3xl mb-3">🤖</div>
            <h3 className="font-semibold text-gray-900 mb-2">AI-Powered Learning</h3>
            <p className="text-sm text-gray-600">Get instant answers and personalized learning support</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-3xl mb-3">📚</div>
            <h3 className="font-semibold text-gray-900 mb-2">Rich Resources</h3>
            <p className="text-sm text-gray-600">Access a comprehensive library of educational materials</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-3xl mb-3">💼</div>
            <h3 className="font-semibold text-gray-900 mb-2">Professional Tools</h3>
            <p className="text-sm text-gray-600">Create, collaborate, and manage projects with ease</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link href="/login" className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center font-semibold">
            Sign In
          </Link>
          <Link href="/register" className="flex-1 px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-center font-semibold">
            Create Account
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-12 sm:mt-16 text-center text-xs sm:text-sm text-gray-600 space-y-2 sm:space-y-1">
          <div>© 2024 Pearl_labs uict AI. All rights reserved.</div>
          <div className="flex justify-center gap-4 sm:gap-6">
            <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </main>
  );
}
