'use client';  // Ensure this is a Client Component

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter(); // Use router for refresh

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const task = { title, description };

    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });

    if (res.ok) {
      setTitle('');
      setDescription('');
      router.refresh(); // Refresh the page to update the task list
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        className="p-2 border rounded w-full"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
        className="p-2 border rounded w-full"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add Task
      </button>
    </form>
  );
}
