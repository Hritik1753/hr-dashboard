'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    localStorage.setItem('user', email);
    router.push('/');
  };

  return (
    <div className="flex h-screen items-center justify-center bg-[var(--background)]">
      <div className="p-6 rounded shadow bg-[var(--card)]">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          className="border p-2 rounded w-full"
        />
        <button onClick={handleLogin} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
          Login
        </button>
      </div>
    </div>
  );
}
