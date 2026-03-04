import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12 bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="w-full">
        {children}
      </div>
    </div>
  );
}
