'use client';

import React, { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  noPadding?: boolean;
  shadow?: 'sm' | 'md' | 'lg';
}

export default function Card({
  children,
  noPadding = false,
  shadow = 'md',
  className = '',
  ...props
}: CardProps) {
  const shadows = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
  };

  return (
    <div
      {...props}
      className={`
        bg-white rounded-lg border border-gray-200
        ${shadows[shadow]}
        ${!noPadding ? 'p-6' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
