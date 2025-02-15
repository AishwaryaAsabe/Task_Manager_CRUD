'use client';

import { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { Task } from '../types'; // ✅ Uses absolute import

async function fetchTasks(): Promise<Task[]> {
  try {
    const res = await fetch('/api/tasks');
    if (!res.ok) throw new Error('Failed to fetch tasks');

    const data = await res.json();

    // ✅ Replace 'any' with 'Task'
    const validatedTasks: Task[] = data.map((task: Task) => ({
      _id: task._id || crypto.randomUUID(), 
      title: task.title,
      description: task.description ?? "", // Ensure it's a string
      completed: task.completed ?? false, // Ensure it's a boolean
    }));

    console.log("Fetched tasks:", validatedTasks);
    return validatedTasks;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
}



export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]); // ✅ Ensure state uses Task[]

  useEffect(() => {
    fetchTasks().then(setTasks);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <TaskForm setTasks={setTasks} onTaskAdded={() => fetchTasks().then(setTasks)} />
      {tasks.length > 0 ? <TaskList tasks={tasks} setTasks={setTasks} /> : <p>No tasks found.</p>}
    </div>
  );
}
