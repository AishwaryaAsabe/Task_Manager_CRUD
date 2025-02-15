
// import { useEffect, useState } from "react";

// interface Task {
//   _id: string;
//   title: string;
// }

// const TaskList = () => {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

//   // Fetch tasks from API
//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await fetch("/api/tasks");
//         if (!response.ok) throw new Error("Failed to fetch");

//         const data = await response.json();
//         setTasks(data);
//       } catch (error) {
//         console.error("Error fetching tasks:", error);
//       }
//     };

//     fetchTasks();
//   }, []);

//   // Handle checkbox selection for tasks
//   const toggleSelection = (taskId: string) => {
//     setSelectedTasks((prev) =>
//       prev.includes(taskId)
//         ? prev.filter((id) => id !== taskId) // Remove if already selected
//         : [...prev, taskId] // Add if not selected
//     );
//   };

//   // Delete selected tasks (bulk)
//   const deleteTasks = async () => {
//     if (selectedTasks.length === 0) return;

//     try {
//       const response = await fetch("/api/tasks", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ taskIds: selectedTasks }),
//       });

//       if (!response.ok) throw new Error("Failed to delete tasks");

//       // Update UI after deletion
//       setTasks((prev) => prev.filter((task) => !selectedTasks.includes(task._id)));
//       setSelectedTasks([]); // Clear selection
//     } catch (error) {
//       console.error("Error deleting tasks:", error);
//     }
//   };

//   // Delete a single task
//   const deleteSingleTask = async (taskId: string) => {
//     try {
//       const response = await fetch(`/api/tasks/${taskId}`, { method: "DELETE" });
//       if (!response.ok) throw new Error("Failed to delete task");

//       setTasks((prev) => prev.filter((task) => task._id !== taskId));
//     } catch (error) {
//       console.error("Error deleting task:", error);
//     }
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold mb-4 text-gray-800">Task List</h2>
  
//       {/* Action Buttons for Selected Tasks */}
//       {selectedTasks.length > 0 && (
//         <div className="flex space-x-4 mb-4">
//           {selectedTasks.length === 1 ? (
//             <>
//               <button
//                 onClick={() => deleteSingleTask(selectedTasks[0])}
//                 className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
//               >
//                 Delete
//               </button>
//               <button
//                 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
//               >
//                 Edit
//               </button>
//               <button
//                 className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
//               >
//                 View
//               </button>
//             </>
//           ) : (
//             <button
//               onClick={deleteTasks}
//               className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
//             >
//               Delete Selected
//             </button>
//           )}
//         </div>
//       )}
  
//       {/* Task List */}
//       <ul className="space-y-3">
//         {tasks.map((task) => (
//           <li
//             key={task._id}
//             className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-200"
//           >
//             <div className="flex items-center space-x-4">
//               <input
//                 type="checkbox"
//                 checked={selectedTasks.includes(task._id)}
//                 onChange={() => toggleSelection(task._id)}
//                 className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
//               />
//               <span className="text-lg text-gray-700">{task.title}</span>
//             </div>
//             <button
//               onClick={() => deleteSingleTask(task._id)}
//               className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
//             >
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TaskList;




// import { useRouter } from "next/navigation";
// import { useState } from "react";

// interface Task {
//   _id: string;
//   title: string;
//   description: string;
//   completed: boolean;
// }

// interface TaskListProps {
//   tasks: Task[];
//   setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
// }

// const TaskList: React.FC<TaskListProps> = ({ tasks, setTasks }) => {
//   const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
//   const router = useRouter();

//   // Handle checkbox selection for tasks
//   const toggleSelection = (taskId: string) => {
//     setSelectedTasks((prev) =>
//       prev.includes(taskId)
//         ? prev.filter((id) => id !== taskId)
//         : [...prev, taskId]
//     );
//   };

//   // Delete selected tasks (bulk)
//   const deleteTasks = async () => {
//     if (selectedTasks.length === 0) return;

//     try {
//       const response = await fetch("/api/tasks", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ taskIds: selectedTasks }),
//       });

//       if (!response.ok) throw new Error("Failed to delete tasks");

//       setTasks((prev) => prev.filter((task) => !selectedTasks.includes(task._id)));
//       setSelectedTasks([]);
//     } catch (error) {
//       console.error("Error deleting tasks:", error);
//     }
//   };

//   // Delete a single task
//   const deleteSingleTask = async (taskId: string) => {
//     try {
//       const response = await fetch(`/api/tasks/${taskId}`, { method: "DELETE" });
//       if (!response.ok) throw new Error("Failed to delete task");

//       setTasks((prev) => prev.filter((task) => task._id !== taskId));
//     } catch (error) {
//       console.error("Error deleting task:", error);
//     }
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold mb-4 text-gray-800">Task List</h2>

//       {selectedTasks.length > 0 && (
//         <div className="flex space-x-4 mb-4">
//           {selectedTasks.length === 1 ? (
//             <>
//               <button
//                 onClick={() => deleteSingleTask(selectedTasks[0])}
//                 className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
//               >
//                 Delete
//               </button>
//               <button
//   onClick={() => router.push(`/edit-task/${selectedTasks[0]}`)}
// >
//     Edit
// </button>



//               <button
//                 onClick={() => router.push(`/ViewTask/${selectedTasks[0]}`)}
//                 className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
//               >
//                 View
//               </button>
//             </>
//           ) : (
//             <button
//               onClick={deleteTasks}
//               className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
//             >
//               Delete Selected
//             </button>
//           )}
//         </div>
//       )}

//       <ul className="space-y-3">
//         {tasks.map((task) => (
//           <li
//             key={task._id}
//             className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-200"
//           >
//             <div className="flex items-center space-x-4">
//               <input
//                 type="checkbox"
//                 checked={selectedTasks.includes(task._id)}
//                 onChange={() => toggleSelection(task._id)}
//                 className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
//               />
//               <span className="text-lg text-gray-700">{task.title}</span>
//             </div>
//             <button
//               onClick={() => deleteSingleTask(task._id)}
//               className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
//             >
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TaskList;














import { useRouter } from "next/navigation";
import { useState } from "react";
import { Task } from "../types";

interface TaskListProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, setTasks }) => {
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const router = useRouter();

  const toggleSelection = (taskId: string) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  const deleteTasks = async () => {
    if (selectedTasks.length === 0) return;

    try {
      const response = await fetch("/api/tasks", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskIds: selectedTasks }),
      });

      if (!response.ok) throw new Error("Failed to delete tasks");

      setTasks((prev) => prev.filter((task) => !selectedTasks.includes(task._id)));
      setSelectedTasks([]);
    } catch (error) {
      console.error("Error deleting tasks:", error);
    }
  };

  const deleteSingleTask = async (taskId: string) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete task");

      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Task List</h2>

      {selectedTasks.length > 0 && (
        <div className="flex space-x-4 mb-4">
          {selectedTasks.length === 1 ? (
            <>
              <button
                onClick={() => deleteSingleTask(selectedTasks[0])}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
              >
                Delete
              </button>
              <button onClick={() => router.push(`/edit-task/${selectedTasks[0]}`)}>Edit</button>
              <button
                onClick={() => router.push(`/ViewTask/${selectedTasks[0]}`)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
              >
                View
              </button>
            </>
          ) : (
            <button
              onClick={deleteTasks}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
            >
              Delete Selected
            </button>
          )}
        </div>
      )}

      <ul className="space-y-3">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-200"
          >
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={selectedTasks.includes(task._id)}
                onChange={() => toggleSelection(task._id)}
                className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-lg text-gray-700">{task.title}</span>
            </div>
            <button
              onClick={() => deleteSingleTask(task._id)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
