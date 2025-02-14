


'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      router.push('/dashboard'); 
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg max-w-md mx-auto">
    <input
      className="border p-2 w-full"
      placeholder="Email"
      type="email"
      value={formData.email}
      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
    />
    <input
      className="border p-2 w-full mt-2"
      placeholder="Password"
      type="password"
      value={formData.password}
      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mt-4 w-full">Login</button>
  </form>
  );
}
