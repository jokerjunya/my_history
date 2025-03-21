import React, { useState } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import Timeline from '../components/Timeline';
import { useMemories } from '../hooks/useMemories';
import ImageSelectionModal from '../components/ImageSelectionModal';

const Home: NextPage = () => {
  const { memories, loading, deleteMemory, editMemory } = useMemories();
  const [showImageSelectionModal, setShowImageSelectionModal] = useState(false);

  const handleCreateNewStory = () => {
    // 3枚以上の画像があるかチェック
    if (memories.length >= 3) {
      // 画像選択モーダルを表示
      setShowImageSelectionModal(true);
    } else {
      // 画像が足りない場合は直接インポート画面へ
      window.location.href = '/add-memory';
    }
  };

  const handleCloseModal = () => {
    setShowImageSelectionModal(false);
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">あなたの思い出タイムライン</h1>
        <p className="text-lg text-gray-600 mb-6">
          あなたの大切な思い出を年表形式で振り返りましょう
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
          <button
            onClick={handleCreateNewStory}
            className="bg-primary hover:bg-opacity-90 text-white font-bold py-3 px-6 rounded-lg inline-flex items-center text-xl"
          >
            <span className="mr-2">✨</span>
            新しい思い出を作成
          </button>
          
          <Link
            href="/add-memory"
            className="bg-secondary hover:bg-opacity-90 text-white font-bold py-3 px-6 rounded-lg inline-flex items-center text-xl"
          >
            <span className="mr-2">📸</span>
            写真をインポート
          </Link>
        </div>
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

      {/* 画像選択モーダル */}
      {showImageSelectionModal && (
        <ImageSelectionModal 
          memories={memories} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};

export default Home; 