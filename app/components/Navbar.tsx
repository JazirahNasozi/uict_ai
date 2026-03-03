'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import Button from './Button';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-linear-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">UA</span>
            </div>
            <Link href="/" className="font-bold text-gray-900 text-lg">
              UICT AI
            </Link>
          </div>

          {/* User Menu */}
          {user && (
            <div className="flex items-center gap-4 relative">
              <div className="hidden sm:flex flex-col items-end">
                <div className="font-medium text-gray-900 text-sm">{user.name}</div>
                <div className="text-xs text-gray-500 capitalize">{user.role}</div>
              </div>

              {/* Avatar */}
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="w-10 h-10 bg-linear-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold cursor-pointer hover:shadow-md transition-shadow"
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
