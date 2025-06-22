'use client';

import "./globals.css";
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/context/ThemeContext';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function RootLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');

    // Redirect if trying to access protected page without login
    const isProtectedRoute = !pathname.startsWith('/login');
    if (!user && isProtectedRoute) {
      router.replace('/login');
    } else {
      setIsAuthenticated(!!user);
    }
  }, [pathname]);

  return (
    <html lang="en">
      <body>
        <ThemeProvider>

          {/* Navbar only for logged-in users */}
          {isAuthenticated && (
            <nav
              className="p-4 border-b flex gap-4"
              style={{ backgroundColor: 'var(--navbar)' }}
            >
              <Link href="/" className="font-semibold">Dashboard</Link>
              <Link href="/bookmarks">Bookmarks</Link>
              <Link href="/analytics">Analytics</Link>
              <button
                onClick={() => {
                  localStorage.removeItem('user');
                  router.push('/login');
                }}
                className="ml-auto text-red-600"
              >
                Logout
              </button>
            </nav>
          )}

          <Toaster position="top-right" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}