import React, { useState } from 'react';
import { PhotoMemory } from '../types';

interface MemoryCardProps {
  memory: PhotoMemory;
  onDelete: (id: string) => void;
  onEdit: (id: string, updatedMemory: Partial<PhotoMemory>) => void;
}

const MemoryCard: React.FC<MemoryCardProps> = ({ memory, onDelete, onEdit }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // 画像パスの処理
  let imageSrc = memory.imageUrl;
  
  // 画像パスが相対パスの場合、正しく表示されるよう処理
  if (imageSrc && !imageSrc.startsWith('http') && !imageSrc.startsWith('data:') && !imageSrc.startsWith('blob:')) {
    // 先頭に/が付いていない場合は追加
    if (!imageSrc.startsWith('/')) {
      imageSrc = `/${imageSrc}`;
    }
  }
  
  return (
    <div 
      className={`memory-card bg-white rounded-lg shadow-md overflow-hidden mb-6 transition-all duration-300 ${
        isExpanded ? 'p-6' : 'p-4'
      }`}
    >
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative h-48 md:h-64 md:w-1/3 rounded-lg overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt={`写真 - ${memory.event}`}
            className="w-full h-full object-cover rounded-lg"
            onError={(e) => {
              // 画像読み込みエラー時にデフォルト画像を表示
              const target = e.target as HTMLImageElement;
              target.onerror = null; // 無限ループ防止
              target.src = '/images/family_birthday.jpg'; // デフォルト画像に置き換え
            }}
          />
        </div>
        
        <div className="md:w-2/3">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{memory.year}年</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-gray-500 hover:text-primary transition"
                aria-label={isExpanded ? '折りたたむ' : '展開する'}
              >
                {isExpanded ? '📝' : '📖'}
              </button>
              <button
                onClick={() => onDelete(memory.id)}
                className="text-gray-500 hover:text-red-500 transition"
                aria-label="削除"
              >
                🗑️
              </button>
            </div>
          </div>
          
          <p className="text-gray-700 mb-1">
            <span className="font-semibold">場所: </span>
            {memory.location}
          </p>
          <p className="text-gray-700 mb-1">
            <span className="font-semibold">人物: </span>
            {memory.people}
          </p>
          <p className="text-gray-700 mb-1">
            <span className="font-semibold">出来事: </span>
            {memory.event}
          </p>
          
          {isExpanded && (
            <>
              <p className="text-gray-700 mb-3">
                <span className="font-semibold">印象: </span>
                {memory.impression}
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">自分史</h4>
                <p className="text-gray-700">{memory.story}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemoryCard; 