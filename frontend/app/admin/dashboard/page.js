'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const router = useRouter();

  const loadContent = () => {
    api.get('/api/content?admin=true')
      .then(res => setItems(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => { loadContent(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this content?')) return;
    try {
      await api.delete(`/api/content/${id}`);
      loadContent();
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleLogout = async () => {
    await api.post('/api/auth/logout');
    router.push('/admin/login');
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-3">
          <button
            onClick={() => router.push('/admin/dashboard/new')}
            className="bg-black text-white px-4 py-2 rounded"
          >
            + New Content
          </button>
          <button onClick={handleLogout} className="border px-4 py-2 rounded">
            Logout
          </button>
        </div>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2 text-left">Section</th>
            <th className="border p-2 text-left">Title</th>
            <th className="border p-2 text-left">Status</th>
            <th className="border p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td className="border p-2">{item.section}</td>
              <td className="border p-2">{item.title}</td>
              <td className="border p-2">{item.status}</td>
              <td className="border p-2 flex gap-2">
                <button
                  onClick={() => router.push(`/admin/dashboard/edit/${item._id}`)}
                  className="text-blue-600"
                >
                  Edit
                </button>
                <button onClick={() => handleDelete(item._id)} className="text-red-600">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
