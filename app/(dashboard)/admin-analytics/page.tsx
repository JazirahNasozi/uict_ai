'use client';

import React, { useEffect, useState } from 'react';
import { getAnalyticsData } from '@/lib/analytics';
import { AnalyticsData } from '@/lib/types';
import Card from '@/app/components/Card';

export default function AdminAnalyticsPage() {
  const [stats, setStats] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    getAnalyticsData().then(setStats);
  }, []);

  if (!stats) {
    return <div className="p-6">Loading analytics...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Console</h1>
      {/* top cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div className="text-sm text-gray-500">Total Users</div>
          <div className="text-2xl font-bold">{stats.totalUsers}</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-500">Students</div>
          <div className="text-2xl font-bold">{stats.totalStudents}</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-500">Lecturers</div>
          <div className="text-2xl font-bold">{stats.totalLecturers}</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-500">Admins</div>
          <div className="text-2xl font-bold">{stats.totalAdmins}</div>
        </Card>
      </div>

      {/* chat volume chart placeholder */}
      <div className="mt-6">
        <Card>
          <h2 className="text-lg font-semibold mb-2">Daily Chat Volume</h2>
          <div className="h-40 bg-gradient-to-b from-blue-50 to-white rounded" />
        </Card>
      </div>

      {/* active users chart placeholder */}
      <div className="mt-6">
        <Card>
          <h2 className="text-lg font-semibold mb-2">Active Users</h2>
          <div className="h-40 bg-gradient-to-b from-green-50 to-white rounded" />
        </Card>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold">Quick Management</h3>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Approve New Accounts</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Generate Usage Report</button>
        </div>
      </div>
    </div>
  );
}
