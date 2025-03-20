import { useState, useEffect } from 'react';
import { PhotoMemory, MemoryFormData } from '../types';
import { createNewMemory, saveMemoriesToLocalStorage, getMemoriesFromLocalStorage } from '../utils/helpers';
import { sampleMemories } from '../utils/mockData';

export const useMemories = () => {
  const [memories, setMemories] = useState<PhotoMemory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMemories = () => {
      setLoading(true);
      
      // ローカルストレージから記憶を取得
      let savedMemories = getMemoriesFromLocalStorage();
      
      // 初回ロード時にサンプルデータを使用
      if (savedMemories.length === 0) {
        savedMemories = sampleMemories;
        saveMemoriesToLocalStorage(savedMemories);
      }
      
      // 時系列順にソート（新しい順）
      savedMemories.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      setMemories(savedMemories);
      setLoading(false);
    };

    fetchMemories();
  }, []);

  const addMemory = (formData: MemoryFormData, imageUrl: string) => {
    const newMemory = createNewMemory(formData, imageUrl);
    const updatedMemories = [newMemory, ...memories];
    setMemories(updatedMemories);
    saveMemoriesToLocalStorage(updatedMemories);
    return newMemory;
  };

  const editMemory = (id: string, updatedMemory: Partial<PhotoMemory>) => {
    const updatedMemories = memories.map(memory => 
      memory.id === id ? { ...memory, ...updatedMemory } : memory
    );
    setMemories(updatedMemories);
    saveMemoriesToLocalStorage(updatedMemories);
  };

  const deleteMemory = (id: string) => {
    const updatedMemories = memories.filter(memory => memory.id !== id);
    setMemories(updatedMemories);
    saveMemoriesToLocalStorage(updatedMemories);
  };

  return {
    memories,
    loading,
    addMemory,
    editMemory,
    deleteMemory
  };
}; 