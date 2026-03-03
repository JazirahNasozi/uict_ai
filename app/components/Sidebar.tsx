'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

const navItems = {
  student: [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'AI Assistant', href: '/assistant', icon: '🤖' },
    { name: 'My Conversations', href: '/conversations', icon: '💬' },
  ],
  lecturer: [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'AI Assistant', href: '/assistant', icon: '🤖' },
    { name: 'Students', href: '/user-management', icon: '👥' },
  ],
  admin: [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Analytics', href: '/admin-analytics', icon: '📈' },
    { name: 'User Management', href: '/user-management', icon: '👥' },
    { name: 'Conversation Logs', href: '/conversations', icon: '💬' },
    { name: 'AI Assistant', href: '/assistant', icon: '🤖' },
  ],
};

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  if (!user) return null;

  const items = navItems[user.role] || [];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <nav className="p-4 space-y-2">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors duration-200
                ${isActive
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
