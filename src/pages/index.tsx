import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import Timeline from '../components/Timeline';
import { useMemories } from '../hooks/useMemories';

const Home: NextPage = () => {
  const { memories, loading, deleteMemory, editMemory } = useMemories();

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">あなたの思い出タイムライン</h1>
        <p className="text-lg text-gray-600 mb-6">
          あなたの大切な思い出を年表形式で振り返りましょう
        </p>
        <Link
          href="/add-memory"
          className="bg-secondary hover:bg-opacity-90 text-white font-bold py-3 px-6 rounded-lg inline-flex items-center"
        >
          <span className="mr-2">📸</span>
          新しい思い出を追加
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">読み込み中...</p>
        </div>
      ) : (
        <Timeline
          memories={memories}
          onDeleteMemory={deleteMemory}
          onEditMemory={editMemory}
        />
      )}
    </div>
  );
};

export default Home; 