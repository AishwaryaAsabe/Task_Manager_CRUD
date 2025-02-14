import { useState } from 'react';

interface AuthFormProps {
  title: 'Login' | 'Register';
  onSubmit: (formData: { username: string; email: string; password: string }) => void;
  errorMessage?: string;
}

export default function AuthForm({ title, onSubmit, errorMessage }: AuthFormProps) {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {title === 'Register' && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full">
          {title}
        </button>
      </form>
    </div>
  );
}
