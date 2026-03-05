'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

interface SidebarProps {
  onNavClick?: () => void;
}

// simplified navigation matching the provided dashboard design
const navItems = [
  { name: 'New Chat', href: '/dashboard/new-chat', icon: '💬' },
  { name: 'Library', href: '/dashboard/library', icon: '📚' },
  { name: 'Projects', href: '/dashboard/projects', icon: '📁' },
  { name: 'Chats', href: '/dashboard/chats', icon: '🕘' },
];

export default function Sidebar({ onNavClick }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useAuth();

  if (!user) return null;

  const items = navItems; // fixed list regardless of role

  return (
    <aside className="w-full lg:w-64 bg-white min-h-screen border-r border-gray-200">
      <nav className="p-3 sm:p-4 space-y-2">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavClick}
              className={`
                flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-colors duration-200 text-sm sm:text-base
                ${isActive
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="hidden sm:inline">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
