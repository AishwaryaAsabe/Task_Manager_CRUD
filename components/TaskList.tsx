interface Task {
  id: string;
  title: string;
  description: string;
}

interface TaskListProps {
  tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li key={task.id} className="p-2 border rounded">
          <h3 className="font-bold">{task.title}</h3>
          <p>{task.description}</p>
        </li>
      ))}
    </ul>
  );
}
