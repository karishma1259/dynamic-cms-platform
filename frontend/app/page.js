'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';

function renderBlock(block, idx) {
  switch (block.type) {
    case 'heading':
      const Tag = `h${block.data.level || 2}`;
      return <Tag key={idx} className="font-bold text-2xl my-3">{block.data.text}</Tag>;
    case 'paragraph':
      return <p key={idx} className="my-2 text-gray-700">{block.data.text}</p>;
    case 'list':
      return (
        <ul key={idx} className="list-disc list-inside my-2">
          {block.data.items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      );
    case 'table':
      return (
        <table key={idx} className="w-full border-collapse my-4">
          <thead>
            <tr>
              {block.data.headers.map((h, i) => (
                <th key={i} className="border p-2 bg-gray-100 text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.data.rows.map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => <td key={ci} className="border p-2">{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      );
    default:
      return null;
  }
}

export default function Home() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/content')
      .then(res => setSections(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <main className="max-w-4xl mx-auto p-8">
      {sections.map((section) => (
        <section key={section._id} className="mb-10">
          {section.blocks.map((block, idx) => renderBlock(block, idx))}
        </section>
      ))}
    </main>
  );
}
