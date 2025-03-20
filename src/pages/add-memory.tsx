import React, { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import UploadButton from '../components/UploadButton';
import QuestionForm from '../components/QuestionForm';
import { MemoryFormData } from '../types';
import { useMemories } from '../hooks/useMemories';

const AddMemory: NextPage = () => {
  const router = useRouter();
  const { addMemory } = useMemories();
  const [currentStep, setCurrentStep] = useState<'upload' | 'questions'>('upload');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>('');

  const handleImageUpload = (file: File) => {
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    setCurrentStep('questions');
  };

  const handleFormSubmit = (formData: MemoryFormData) => {
    // ここでAPIと通信する代わりに、一時的にローカルのURL生成
    const memoryImageUrl = photoPreview;
    addMemory(formData, memoryImageUrl);
    router.push('/');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">思い出を追加</h1>

      {currentStep === 'upload' ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <UploadButton onImageUpload={handleImageUpload} />
        </div>
      ) : (
        <QuestionForm 
          onSubmit={handleFormSubmit} 
          photoPreview={photoPreview} 
        />
      )}
    </div>
  );
};

export default AddMemory; 