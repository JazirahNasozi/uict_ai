import type { Metadata } from 'next';
import './globals.css';
import ClientAuthProvider from './ClientAuthProvider';

export const metadata: Metadata = {
  title: 'Pearl_labs uict AI - Chat Dashboard',
  description: 'Professional AI learning platform for schools',
  icons: {
    icon: [{ url: '/favicon.ico' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50 antialiased">
        <ClientAuthProvider>
          {children}
        </ClientAuthProvider>
      </body>
    </html>
  );
}