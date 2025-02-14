'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from '@/app/components/AuthForm';

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleRegister = async (formData: { username: string; email: string; password: string }) => {
    if (!formData.username) {
      setError('Username is required.');
      return;
    }

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      router.push('/login');
    } else {
      setError('Registration failed. Try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
      <AuthForm title="Register" onSubmit={handleRegister} errorMessage={error} />

      <p className="mt-4 text-sm">
        Already have an account?{' '}
        <button
          onClick={() => router.push('/login')}
          className="text-blue-500 hover:underline"
        >
          Login here
        </button>
      </p>
      </div>
      
    </div>
    
  );
}
