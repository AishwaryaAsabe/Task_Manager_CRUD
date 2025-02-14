'use client';

import { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};

async function fetchTasks(): Promise<Task[]> {
  try {
    const res = await fetch('/api/tasks');
    if (!res.ok) {
      throw new Error('Failed to fetch tasks');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks().then(setTasks);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      {/* ✅ Pass props correctly */}
      <TaskForm setTasks={setTasks} onTaskAdded={() => fetchTasks().then(setTasks)} />
      {tasks.length > 0 ? <TaskList tasks={tasks} setTasks={setTasks} /> 
 : <p>No tasks found.</p>}
    </div>
  );
}
