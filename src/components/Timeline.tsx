import React from 'react';
import { PhotoMemory } from '../types';
import MemoryCard from './MemoryCard';

interface TimelineProps {
  memories: PhotoMemory[];
  onDeleteMemory: (id: string) => void;
  onEditMemory: (id: string, updatedMemory: Partial<PhotoMemory>) => void;
}

const Timeline: React.FC<TimelineProps> = ({ memories, onDeleteMemory, onEditMemory }) => {
  // 年ごとにグループ化
  const groupedMemories: Record<string, PhotoMemory[]> = {};
  
  memories.forEach(memory => {
    const year = memory.year || 'その他';
    if (!groupedMemories[year]) {
      groupedMemories[year] = [];
    }
    groupedMemories[year].push(memory);
  });
  
  // 年を降順でソート
  const years = Object.keys(groupedMemories).sort((a, b) => {
    return parseInt(b) - parseInt(a);
  });
  
  if (memories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-500">まだ思い出が追加されていません。「思い出を追加」から始めましょう！</p>
      </div>
    );
  }
  
  return (
    <div className="timeline-container my-8 relative">
      <div className="timeline-line"></div>
      
      {years.map(year => (
        <div key={year} className="mb-12">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white z-10">
              📅
            </div>
            <h2 className="text-2xl font-bold text-gray-800 ml-4">{year}年</h2>
          </div>
          
          <div className="pl-12">
            {groupedMemories[year].map(memory => (
              <MemoryCard
                key={memory.id}
                memory={memory}
                onDelete={onDeleteMemory}
                onEdit={onEditMemory}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline; 