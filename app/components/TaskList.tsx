




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
      setSelectedTasks([]); // Clear selection after deletion
    } catch (error) {
      console.error("Error deleting tasks:", error);
    }
  };

  // Delete a single task
  const deleteSingleTask = async (taskId: string) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete task");

      setTasks((prev) => prev.filter((task) => task._id !== taskId));
      setSelectedTasks((prev) => prev.filter((id) => id !== taskId)); 
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
                onClick={() => router.push(`/edit-task/${selectedTasks[0]}`)}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition duration-200"
              >
                Edit
              </button>
              <button
      onClick={() => router.push(`/view_task/${selectedTasks[0]}`)}  
      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
    >
      View
    </button>


              <button
                onClick={() => deleteSingleTask(selectedTasks[0])}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
              >
                Delete
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
