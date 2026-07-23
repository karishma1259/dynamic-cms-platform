'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import api from '@/lib/api';

export default function EditContent() {
  const [section, setSection] = useState('');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [status, setStatus] = useState('draft');
  const [blocks, setBlocks] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    api.get(`/api/content/${params.id}`)
      .then(res => {
        const d = res.data;
        setSection(d.section);
        setTitle(d.title);
        setSlug(d.slug);
        setStatus(d.status);
        setBlocks(JSON.stringify(d.blocks, null, 2));
      })
      .catch(err => setError('Failed to load content'))
      .finally(() => setLoading(false));
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    let parsedBlocks;
    try {
      parsedBlocks = JSON.parse(blocks);
    } catch (err) {
      setError('Blocks must be valid JSON');
      return;
    }
    try {
      await api.put(`/api/content/${params.id}`, { section, title, slug, status, blocks: parsedBlocks });
      router.push('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update content');
    }
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Edit Content</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input placeholder="Section" value={section} onChange={e => setSection(e.target.value)} className="border p-2 rounded" />
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="border p-2 rounded" />
        <input placeholder="Slug" value={slug} onChange={e => setSlug(e.target.value)} className="border p-2 rounded" />
        <select value={status} onChange={e => setStatus(e.target.value)} className="border p-2 rounded">
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        <label className="text-sm text-gray-600">Blocks (JSON)</label>
        <textarea
          value={blocks}
          onChange={e => setBlocks(e.target.value)}
          rows={12}
          className="border p-2 rounded font-mono text-sm"
        />
        <div className="flex gap-3">
          <button type="submit" className="bg-black text-white px-4 py-2 rounded">Update</button>
          <button type="button" onClick={() => router.push('/admin/dashboard')} className="border px-4 py-2 rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
}
