'use client';

import React from 'react';
import { useAuth } from '@/lib/auth-context';

export default function DashboardHome() {
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0] || 'there';

  return (
    <div className="p-6 sm:p-10">
      <h1 className="text-2xl sm:text-3xl font-bold mb-1">Hi {firstName},</h1>
      <p className="text-gray-600 mb-6">Where should we start?</p>

      <div className="max-w-xl mx-auto">
        <div className="bg-white shadow-md rounded-2xl p-6 flex items-center space-x-3">
          <input
            type="text"
            placeholder="Ask Pearl_labs uict AI..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go
          </button>
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs text-gray-500">
          <span className="px-3 py-1 bg-gray-100 rounded-full">Writing</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full">Exam Practice</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full">Presentation</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full">Mocks</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full">Create Image</span>
        </div>
      </div>
    </div>
  );
}