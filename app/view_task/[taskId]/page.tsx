"use client";
import { useState, useEffect } from "react";

const ViewTask = ({ params }: { params: Promise<{ taskId: string }> }) => {
  const [task, setTask] = useState<{ title: string; description: string } | null>(null);
  const [taskId, setTaskId] = useState<string | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const resolvedParams = await params; // ✅ Await the params first
        setTaskId(resolvedParams.taskId); // Store taskId in state

        const res = await fetch(`/api/tasks/${resolvedParams.taskId}`);
        const data = await res.json();
        setTask(data);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchTask();
  }, [params]);

  if (!task) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">{task.title}</h2>
      <p className="text-gray-700">{task.description}</p>
    </div>
  );
};

export default ViewTask;
