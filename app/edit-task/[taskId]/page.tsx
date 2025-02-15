"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

const EditTask = () => {
  const { taskId } = useParams(); // ✅ Use `useParams()` to get taskId
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        if (!taskId) return;
        const res = await fetch(`/api/tasks/${taskId}`);
        const data = await res.json();
        setTitle(data.title);
        setDescription(data.description);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleUpdate = async () => {
    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      if (!res.ok) throw new Error("Failed to update task");

      router.push("/");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
      <input
        type="text"
        className="w-full p-2 border rounded mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
      />
      <textarea
        className="w-full p-2 border rounded mb-4"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleUpdate}
      >
        Update Task
      </button>
    </div>
  );
};

export default EditTask;
