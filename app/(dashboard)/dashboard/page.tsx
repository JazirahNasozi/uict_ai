'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { getAnalyticsData } from '@/lib/analytics';
import { AnalyticsData } from '@/lib/types';
import Card from '@/app/components/Card';

export default function DashboardPage() {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    // fetch analytics only for admins or lecturers if wanted
    if (user?.role === 'admin') {
      getAnalyticsData().then(setAnalytics);
    }
  }, [user]);

  if (!user) return null;

  const firstName = user.name.split(' ')[0];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Hello, {firstName}.</h1>
      <p className="text-gray-600 mt-1">How can I assist your {user.role === 'student' ? 'studies' : 'work'} today?</p>

      <div className="mt-6 flex flex-col md:flex-row gap-4">
        <Link href="/assistant" className="w-full md:w-auto">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <h2 className="text-lg font-semibold">Start New Chat</h2>
            <p className="text-sm text-gray-500">Ask anything about your courses</p>
          </Card>
        </Link>

        {user.role === 'admin' && analytics && (
          <Card className="flex-1">
            <h2 className="text-lg font-semibold">Quick Stats</h2>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <div className="text-sm text-gray-500">Total Users</div>
                <div className="text-xl font-bold">{analytics.totalUsers}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Active Users</div>
                <div className="text-xl font-bold">{analytics.activeUsers}</div>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* placeholder for recent activity */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold">Recent Activity</h3>
        <p className="text-sm text-gray-500">No recent activity to show.</p>
      </div>
    </div>
  );
}
