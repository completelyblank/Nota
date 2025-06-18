'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1647200438666-5b65d9fa81bf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <LoginForm />
    </div>
  );
}

function LoginForm() {
  const router = useRouter();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('student');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const endpoint = isRegistering ? '/api/register' : '/api/verify';

    const body = isRegistering
      ? { email, password, name, role }
      : { email, password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong');
        return;
      }

      localStorage.setItem('user', JSON.stringify(data));
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      setErrorMsg('Something went wrong. Please try again.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 p-8 rounded-lg shadow-xl w-full max-w-md bg-opacity-90"
    >
      <h2 className="text-4xl font-bold text-white mb-6 text-center">Nota</h2>
      <h2 className="text-2xl font-serif text-white mb-6 text-center">
        {isRegistering ? 'Register' : 'Login'}
      </h2>

      <div className="space-y-4">
        {isRegistering && (
          <>
            <div>
              <label className="block text-sm text-gray-300 mb-1" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1" htmlFor="role">
                Role
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>
          </>
        )}
        <div>
          <label className="block text-sm text-gray-300 mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="Enter your password"
            required
          />
        </div>
        {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}
        <button
          type="submit"
          className="w-full py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md transition duration-200"
        >
          {isRegistering ? 'Sign Up' : 'Sign In'}
        </button>
        <p
          className="text-gray-300 text-sm text-center mt-4 cursor-pointer hover:underline"
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering
            ? 'Already have an account? Login'
            : "Don't have an account? Register"}
        </p>
      </div>
    </form>
  );
}
