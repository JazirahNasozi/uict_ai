import type { Metadata } from 'next';
import './globals.css';
import ClientAuthProvider from './ClientAuthProvider';

export const metadata: Metadata = {
  title: 'UICT AI - Intelligent Learning Assistant',
  description: 'Your assistant for learning and campus services',
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