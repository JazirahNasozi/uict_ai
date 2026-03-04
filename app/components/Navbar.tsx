'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import Button from './Button';

interface NavbarProps {
  onMenuClick?: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Menu button for mobile + Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            {user && (
              <button
                onClick={onMenuClick}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-linear-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs sm:text-sm">UA</span>
            </div>
            <Link href="/" className="font-bold text-gray-900 text-sm sm:text-lg hidden sm:block">
              Pearl_labs uict AI
            </Link>
          </div>

          {/* User Menu */}
          {user && (
            <div className="flex items-center gap-2 sm:gap-4 relative">
              <div className="hidden sm:flex flex-col items-end">
                <div className="font-medium text-gray-900 text-xs sm:text-sm">{user.name}</div>
                <div className="text-xs text-gray-500 capitalize">{user.role}</div>
              </div>

              {/* Avatar */}
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="w-8 h-8 sm:w-10 sm:h-10 bg-linear-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold cursor-pointer hover:shadow-md transition-shadow text-xs sm:text-sm"
              >
                {user.name.charAt(0)}
              </button>

              {/* Dropdown Menu */}
              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 top-full z-50">
                  <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg">
                    View Profile
                  </Link>
                  <Button
                    onClick={handleLogout}
                    variant="secondary"
                    size="sm"
                    fullWidth
                    className="m-2 text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
