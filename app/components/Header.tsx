import Link from 'next/link';

export default function Header() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <Link href="/" className="text-xl">Task Manager</Link>
        <Link href="/dashboard" className="px-4 py-2 bg-blue-500 rounded">Dashboard</Link>
      </div>
    </nav>
  );
}
