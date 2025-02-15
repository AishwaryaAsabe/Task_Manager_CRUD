// 

"use client"; 

import { useState, useEffect } from "react";

// interface Task {
//   _id: string;
//   title: string;
// }
// 
// const EditTask = ({ taskId }: { taskId: string }) => { 
//   const router = useRouter();
//   const [title, setTitle] = useState("");

  // useEffect(() => {
  //   if (!taskId) return; 

  //   const fetchTask = async () => {
  //     try {
  //       const response = await fetch(`/api/tasks/${taskId}`);
  //       if (!response.ok) throw new Error("Failed to fetch task");

  //       const data = await response.json();
  //       setTitle(data.title);
  //     } catch (error) {
  //       console.error("Error fetching task:", error);
  //     }
  //   };

  //   fetchTask();
  // }, [taskId]);

  const EditTask = ({ taskId }: { taskId: string }) => {
    const [title, setTitle] = useState("");

    useEffect(() => {
        if (!taskId) {
            console.error("❌ taskId is missing in EditTask!");
            return;
        }
        console.log("🟢 Received taskId in EditTask:", taskId);

        const fetchTask = async () => {
            try {
                console.log("🔄 Fetching task:", `/api/tasks/${taskId}`);
                const response = await fetch(`/api/tasks/${taskId}`);
                if (!response.ok) throw new Error("Failed to fetch task");

                const data = await response.json();
                console.log("✅ Task data received:", data);
                setTitle(data.title);
            } catch (error) {
                console.error("❌ Error fetching task:", error);
            }
        };

        fetchTask();
    }, [taskId]);
  
  // const updateTask = async () => {
  //   if (!taskId) {
  //     console.error("Error: Task ID is missing");
  //     return;
  //   }
  
  //   try {
  //     const response = await fetch(`/api/tasks/${taskId}`, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ title }),
  //     });
  
  //     if (!response.ok) throw new Error("Failed to update task");
  
  //     router.push("/");
  //   } catch (error) {
  //     console.error("Error updating task:", error);
  //   }
  // };
  

  interface TaskUpdateData {
    title: string;
  }
  
  const updateTask = async (taskId: string | undefined, updatedData: TaskUpdateData) => {
    if (!taskId) {
        console.error("❌ Task ID is undefined in updateTask!");
        return;
    }

    console.log("🟢 Sending PUT request to:", `/api/tasks/${taskId}`);

    try {
        const response = await fetch(`/api/tasks/${taskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("❌ Error updating task:", errorText);
        }
    } catch (error) {
        console.error("❌ Network error:", error);
    }
};





  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Task</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button
       onClick={() => updateTask(taskId, { title })}

        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Update Task
      </button>
    </div>
  );
};

export default EditTask;
