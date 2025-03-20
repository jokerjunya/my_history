import React, { useState } from 'react';
import { Question, MemoryFormData } from '../types';
import { questionsList } from '../utils/mockData';

interface QuestionFormProps {
  onSubmit: (formData: MemoryFormData) => void;
  photoPreview: string;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ onSubmit, photoPreview }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [formData, setFormData] = useState<MemoryFormData>({
    location: '',
    people: '',
    event: '',
    impression: '',
    year: new Date().getFullYear().toString(),
  });

  const currentQuestion = questionsList[currentQuestionIndex];

  const handleOptionSelect = (option: string) => {
    const id = currentQuestion.id as keyof MemoryFormData;
    setFormData({ ...formData, [id]: option });
    
    if (option === 'その他') {
      // その他が選択された場合は、すぐに次の質問に進まず、カスタム入力を待つ
      return;
    }
    
    if (currentQuestionIndex < questionsList.length - 1) {
      // 次の質問へ
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = currentQuestion.id;
    setFormData({ 
      ...formData, 
      [`custom${id.charAt(0).toUpperCase() + id.slice(1)}` as keyof MemoryFormData]: e.target.value 
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionsList.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, year: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <div className="h-2 bg-gray-200 flex-grow rounded-full">
          <div 
            className="h-2 bg-primary rounded-full" 
            style={{ width: `${((currentQuestionIndex + 1) / questionsList.length) * 100}%` }}
          ></div>
        </div>
        <span className="ml-4 text-sm font-medium text-gray-500">
          {currentQuestionIndex + 1}/{questionsList.length}
        </span>
      </div>

      {photoPreview && (
        <div className="relative w-full h-48 md:h-64 mb-6 rounded-lg overflow-hidden">
          <img 
            src={photoPreview} 
            alt="アップロードされた写真"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {currentQuestionIndex === 0 && (
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            この写真が撮られた年を記入してください
          </label>
          <input
            type="text"
            value={formData.year}
            onChange={handleYearChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="例: 1985"
          />
        </div>
      )}

      <h3 className="text-xl font-bold text-gray-800 mb-4">
        {currentQuestion.text}
      </h3>

      <div className="space-y-3 mb-6">
        {currentQuestion.options?.map((option) => (
          <button
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={`w-full px-4 py-3 text-left rounded-md transition ${
              formData[currentQuestion.id as keyof MemoryFormData] === option
                ? 'bg-primary text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
          >
            {option}
          </button>
        ))}

        {formData[currentQuestion.id as keyof MemoryFormData] === 'その他' && (
          <div className="mt-4">
            <input
              type="text"
              onChange={handleCustomInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="具体的に記入してください"
              autoFocus
            />
            <button
              onClick={handleNextQuestion}
              className="mt-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90"
            >
              次へ
            </button>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <button
          onClick={handlePrevQuestion}
          disabled={currentQuestionIndex === 0}
          className={`px-4 py-2 rounded-md ${
            currentQuestionIndex === 0
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
          }`}
        >
          前へ
        </button>

        {currentQuestionIndex === questionsList.length - 1 ? (
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-secondary text-white rounded-md hover:bg-opacity-90"
          >
            完了
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90"
            disabled={!formData[currentQuestion.id as keyof MemoryFormData]}
          >
            次へ
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionForm; 