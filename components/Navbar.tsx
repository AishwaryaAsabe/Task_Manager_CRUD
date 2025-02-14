"use client"
import { signOut } from 'next-auth/react';

export default function Navbar() {
  return (
    <nav className="bg-blue-500 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Task Manager</h1>
        <button onClick={() => signOut()} className="p-2 bg-red-500 rounded">
          Sign Out
        </button>
      </div>
    </nav>
  );
}