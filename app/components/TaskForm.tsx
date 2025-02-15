

// 'use client';
// import { useState } from 'react';

// type Task = {
//   id: string;
//   title: string;
//   description: string;
//   completed: boolean;
// };

// interface TaskFormProps {
//   setTasks: React.Dispatch<React.SetStateAction<Task[]>>; 
//     onTaskAdded: () => Promise<void>; 
// }

// const TaskForm: React.FC<TaskFormProps> = ({ setTasks, onTaskAdded }) => {
//   const [task, setTask] = useState({ title: '', description: '' });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const res = await fetch('/api/tasks', {
//       method: 'POST',
//       body: JSON.stringify({ ...task, completed: false }),
//       headers: { 'Content-Type': 'application/json' },
//     });

//     if (res.ok) {
//       const newTask = await res.json();
//       setTasks((prevTasks) => [...prevTasks, newTask]); 
//       setTask({ title: '', description: '' });
//       await onTaskAdded(); 
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded mb-4">
//       <input
//         type="text"
//         placeholder="Task Title"
//         className="border p-2 w-full mb-2"
//         value={task.title}
//         onChange={(e) => setTask({ ...task, title: e.target.value })}
//       />
//       <textarea
//         placeholder="Task Description"
//         className="border p-2 w-full mb-2"
//         value={task.description}
//         onChange={(e) => setTask({ ...task, description: e.target.value })}
//       />
//       <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
//         Add Task
//       </button>
//     </form>
//   );
// };

// export default TaskForm;







'use client';
import { useState } from 'react';
import { Task } from "../types";

interface TaskFormProps {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  onTaskAdded: () => Promise<void>;
}

const TaskForm: React.FC<TaskFormProps> = ({ setTasks, onTaskAdded }) => {
  const [task, setTask] = useState({ title: '', description: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/tasks', {
      method: 'POST',
      body: JSON.stringify({ ...task, completed: false }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      const newTask = await res.json();
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setTask({ title: '', description: '' });
      await onTaskAdded();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded mb-4">
      <input
        type="text"
        placeholder="Task Title"
        className="border p-2 w-full mb-2"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
      />
      <textarea
        placeholder="Task Description"
        className="border p-2 w-full mb-2"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
      />
      <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
