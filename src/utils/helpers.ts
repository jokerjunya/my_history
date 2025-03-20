import { MemoryFormData, PhotoMemory } from '../types';

export const generateUniqueId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const getCurrentYear = (): string => {
  return new Date().getFullYear().toString();
};

export const generateStory = (formData: MemoryFormData): string => {
  // 通常は実際のAI呼び出しを行う場所ですが、このデモではテンプレート文を生成
  const location = formData.location === 'その他' ? formData.customLocation : formData.location;
  const people = formData.people === 'その他' ? formData.customPeople : formData.people;
  const event = formData.event === 'その他' ? formData.customEvent : formData.event;
  const impression = formData.impression === 'その他' ? formData.customImpression : formData.impression;
  const year = formData.year || getCurrentYear();
  
  return `${year}年、${location}で${people}と一緒に${event}を過ごしました。${impression}が特に印象に残っています。この瞬間はあなたにとって特別な思い出です。`;
};

export const createNewMemory = (formData: MemoryFormData, imageUrl: string): PhotoMemory => {
  const location = formData.location === 'その他' ? formData.customLocation : formData.location;
  const people = formData.people === 'その他' ? formData.customPeople : formData.people;
  const event = formData.event === 'その他' ? formData.customEvent : formData.event;
  const impression = formData.impression === 'その他' ? formData.customImpression : formData.impression;
  const story = generateStory(formData);
  const year = formData.year || getCurrentYear();
  
  return {
    id: generateUniqueId(),
    imageUrl,
    date: formatDate(new Date()),
    location: location || '',
    people: people || '',
    event: event || '',
    impression: impression || '',
    story,
    year,
  };
};

export const saveMemoriesToLocalStorage = (memories: PhotoMemory[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('memories', JSON.stringify(memories));
  }
};

export const getMemoriesFromLocalStorage = (): PhotoMemory[] => {
  if (typeof window !== 'undefined') {
    const memories = localStorage.getItem('memories');
    return memories ? JSON.parse(memories) : [];
  }
  return [];
}; 