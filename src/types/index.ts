export interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'free-text';
  options?: string[];
}

export interface PhotoMemory {
  id: string;
  imageUrl: string;
  date: string;
  location: string;
  people: string;
  event: string;
  impression: string;
  story: string;
  year?: string;
}

export interface MemoryFormData {
  location: string;
  people: string;
  event: string;
  impression: string;
  customLocation?: string;
  customPeople?: string;
  customEvent?: string;
  customImpression?: string;
  year?: string;
} 