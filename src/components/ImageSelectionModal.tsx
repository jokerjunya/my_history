import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { PhotoMemory } from '../types';

interface ImageSelectionModalProps {
  memories: PhotoMemory[];
  onClose: () => void;
}

const ImageSelectionModal: React.FC<ImageSelectionModalProps> = ({ memories, onClose }) => {
  const router = useRouter();
  const [selectedImages, setSelectedImages] = useState<PhotoMemory[]>([]);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  useEffect(() => {
    // 3枚のランダムな画像を選択
    if (memories.length >= 3) {
      const shuffled = [...memories].sort(() => 0.5 - Math.random());
      setSelectedImages(shuffled.slice(0, 3));
    }

    // モーダル表示時にスクロールを無効化
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [memories]);

  const handleImageSelect = (id: string) => {
    setSelectedImageId(id);
  };

  const handleProceed = () => {
    if (selectedImageId) {
      // 選択された画像の情報を持って質問画面に遷移
      router.push(`/create-story?imageId=${selectedImageId}`);
    } else {
      // 「該当なし」を選択した場合は、写真なしで質問画面に遷移
      router.push('/create-story');
    }
    onClose();
  };

  const handleSkip = () => {
    // 写真選択をスキップして質問画面に遷移
    router.push('/create-story');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">思い出の写真を選択</h2>
        
        <p className="text-lg text-gray-600 mb-6 text-center">
          以下の写真から思い出を作成する一枚を選んでください
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {selectedImages.map((image) => (
            <div 
              key={image.id}
              onClick={() => handleImageSelect(image.id)}
              className={`relative cursor-pointer rounded-lg overflow-hidden h-64 border-4 ${
                selectedImageId === image.id ? 'border-primary' : 'border-transparent'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={image.imageUrl} 
                alt={image.event} 
                className="w-full h-full object-cover"
              />
              {selectedImageId === image.id && (
                <div className="absolute top-2 right-2 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center">
                  ✓
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={handleSkip}
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg text-lg font-medium hover:bg-gray-300"
          >
            該当する写真はない
          </button>
          
          <button
            onClick={handleProceed}
            disabled={!selectedImageId}
            className={`px-6 py-3 rounded-lg text-lg font-medium ${
              selectedImageId 
                ? 'bg-primary text-white hover:bg-opacity-90' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            この写真で思い出を作成
          </button>
        </div>
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="閉じる"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default ImageSelectionModal; 