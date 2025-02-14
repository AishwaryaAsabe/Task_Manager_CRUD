"use client"; 

import { useState, useEffect } from "react";

interface Task {
  _id: string;
  title: string;
  description: string;
}

const ViewTask = ({ taskId }: { taskId: string }) => { 
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    if (!taskId) return; 

    const fetchTask = async () => {
      try {
        const response = await fetch(`/api/tasks/${taskId}`);
        if (!response.ok) throw new Error("Failed to fetch task");

        const data = await response.json();
        setTask(data);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchTask();
  }, [taskId]);

  if (!task) return <p>Loading task details...</p>; 

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{task.title}</h2>
      <p className="text-gray-700">{task.description}</p>
    </div>
  );
};

export default ViewTask;
