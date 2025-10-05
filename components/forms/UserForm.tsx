'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// Hapus prop onUserAdded dari parameter fungsi
export default function UserForm(/* { onUserAdded }: UserFormProps */) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Gagal menambahkan user');
      }

      setName('');
      setEmail('');
      router.refresh(); // Ini yang akan memicu re-render Server Component

    } catch (error) {
      setError('Terjadi kesalahan tak terduga.');
      console.error('Error submit form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm mx-auto p-4 border border-gray-300 rounded shadow-md">
      <div>
        <h1 className="text-lg font-semibold mb-1">Nama</h1>
        <input
          className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Masukkan Nama"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <h1 className="text-lg font-semibold mb-1">Email</h1>
        <input
          className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          placeholder="Masukkan Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md p-3 w-full transition duration-300 ease-in-out"
        disabled={loading}
      >
        {loading ? 'Menambahkan...' : 'Submit'}
      </button>
    </form>
  );
}