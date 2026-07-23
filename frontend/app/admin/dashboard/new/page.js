'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

const SAMPLE_BLOCKS = JSON.stringify([
  { type: 'heading', data: { text: 'New Section', level: 2 } },
  { type: 'paragraph', data: { text: 'Write your content here.' } }
], null, 2);

export default function NewContent() {
  const [section, setSection] = useState('');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [status, setStatus] = useState('draft');
  const [blocks, setBlocks] = useState(SAMPLE_BLOCKS);
  const [error, setError] = useState('');
  const router = useRouter();

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
      await api.post('/api/content', { section, title, slug, status, blocks: parsedBlocks });
      router.push('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create content');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">New Content</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input placeholder="Section (e.g. hero)" value={section} onChange={e => setSection(e.target.value)} className="border p-2 rounded" />
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="border p-2 rounded" />
        <input placeholder="Slug" value={slug} onChange={e => setSlug(e.target.value)} className="border p-2 rounded" />
        <select value={status} onChange={e => setStatus(e.target.value)} className="border p-2 rounded">
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        <label className="text-sm text-gray-600">Blocks (JSON — supports heading, paragraph, list, table)</label>
        <textarea
          value={blocks}
          onChange={e => setBlocks(e.target.value)}
          rows={12}
          className="border p-2 rounded font-mono text-sm"
        />
        <div className="flex gap-3">
          <button type="submit" className="bg-black text-white px-4 py-2 rounded">Save</button>
          <button type="button" onClick={() => router.push('/admin/dashboard')} className="border px-4 py-2 rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
}
