'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    if (!email.includes('@')) {
      toast.error('Please enter a valid email');
      return;
    }

    localStorage.setItem('user', email);
    toast.success('Welcome HR Manager!');
    router.push('/');
  };

  return (
    <div className="flex h-screen items-center justify-center bg-[var(--background)] text-[var(--foreground)] transition-all duration-300">
     <div className="p-8 rounded-xl shadow-xl border w-full max-w-md bg-[var(--card)] text-[var(--foreground)] space-y-6 transition-all duration-300">

        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome HR to Your Dashboard</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Sign in to manage your team</p>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="hr@example.com"
            className="border p-3 rounded w-full bg-[var(--card)] text-[var(--foreground)] border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
         />

          <button
            onClick={handleLogin}
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </div>

        <p className="text-xs text-center text-gray-500 dark:text-gray-400">
          Powered by <span className="font-semibold">Hritik Paswan</span>
        </p>
      </div>
    </div>
  );
}