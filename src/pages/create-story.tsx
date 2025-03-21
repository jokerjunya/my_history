import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { Question, PhotoMemory } from '../types';
import { getMockMemories } from '../utils/mockData';

const questionFlow: Question[] = [
  {
    id: 'location',
    text: 'どこで撮影された写真ですか？',
    type: 'multiple-choice',
    options: ['自宅', '学校', '旅行先', '公園', '友人の家', 'その他']
  },
  {
    id: 'people',
    text: '誰と一緒にいますか？',
    type: 'multiple-choice',
    options: ['家族', '友人', '同僚', '恋人', '一人', 'その他']
  },
  {
    id: 'event',
    text: 'どんな出来事でしたか？',
    type: 'multiple-choice',
    options: ['誕生日', '旅行', '結婚式', '卒業式', '日常の風景', 'その他']
  },
  {
    id: 'impression',
    text: 'どんな気持ちでしたか？',
    type: 'multiple-choice',
    options: ['嬉しい', '楽しい', '寂しい', '感動した', '驚いた', 'その他']
  },
  {
    id: 'year',
    text: '何年頃の出来事ですか？',
    type: 'free-text'
  },
  {
    id: 'story',
    text: 'この写真について思い出を自由に書いてください',
    type: 'free-text'
  }
];

const CreateStory: React.FC = () => {
  const router = useRouter();
  const { imageId } = router.query;
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [customAnswer, setCustomAnswer] = useState<string>('');
  const [currentImage, setCurrentImage] = useState<PhotoMemory | null>(null);

  useEffect(() => {
    // ルーターが準備できた後に実行
    if (!router.isReady) return;

    // 選択された画像がある場合は取得
    if (imageId) {
      const memories = getMockMemories();
      const image = memories.find(mem => mem.id === imageId);
      if (image) {
        setCurrentImage(image);
      }
    }
  }, [router.isReady, imageId]);

  const currentQuestion = questionFlow[currentQuestionIndex];

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    if (option !== 'その他') {
      setCustomAnswer('');
    }
  };

  const handleNextQuestion = () => {
    // 回答を保存
    const questionId = currentQuestion.id;
    const answer = selectedOption === 'その他' ? customAnswer : selectedOption;
    
    // 回答を更新
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: answer,
      [`custom${questionId.charAt(0).toUpperCase() + questionId.slice(1)}`]: selectedOption === 'その他' ? customAnswer : ''
    }));

    // 次の質問へ
    if (currentQuestionIndex < questionFlow.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedOption('');
      setCustomAnswer('');
    } else {
      // 全ての質問が終了したら、回答をもとに思い出を生成
      handleSubmit();
    }
  };

  const handleFreeTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCustomAnswer(e.target.value);
  };

  const handleSubmit = () => {
    // 回答をもとに思い出を生成して保存
    const newMemory: Partial<PhotoMemory> = {
      imageUrl: currentImage?.imageUrl || '',
      date: new Date().toLocaleDateString(),
      location: answers.location,
      people: answers.people,
      event: answers.event,
      impression: answers.impression,
      year: answers.year,
      story: answers.story || ''
    };

    // ローカルストレージに保存（実際はAPIに送信するなど）
    const memories = JSON.parse(localStorage.getItem('memories') || '[]');
    const updatedMemories = [
      {
        ...newMemory,
        id: Date.now().toString()
      },
      ...memories
    ];
    localStorage.setItem('memories', JSON.stringify(updatedMemories));

    // ホームページに戻る
    router.push('/');
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
      
      // 前の質問の回答を取得
      const prevQuestionId = questionFlow[currentQuestionIndex - 1].id;
      const prevAnswer = answers[prevQuestionId] || '';
      const prevCustomAnswer = answers[`custom${prevQuestionId.charAt(0).toUpperCase() + prevQuestionId.slice(1)}`] || '';
      
      if (prevAnswer === prevCustomAnswer && prevCustomAnswer !== '') {
        setSelectedOption('その他');
        setCustomAnswer(prevCustomAnswer);
      } else {
        setSelectedOption(prevAnswer);
        setCustomAnswer(prevCustomAnswer);
      }
    }
  };

  return (
    <Layout title="思い出を作成">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">思い出を作成</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          {/* 選択された画像があれば表示 */}
          {currentImage && (
            <div className="mb-6">
              <p className="text-lg font-medium text-gray-600 mb-2">選択された写真：</p>
              <div className="h-64 rounded-lg overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={currentImage.imageUrl} 
                  alt="選択された写真" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* 質問フロー */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              質問 {currentQuestionIndex + 1} / {questionFlow.length}
            </h2>
            
            <p className="text-lg text-gray-700 mb-4">{currentQuestion.text}</p>
            
            {currentQuestion.type === 'multiple-choice' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {currentQuestion.options?.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleOptionSelect(option)}
                      className={`py-3 px-4 rounded-lg border text-left ${
                        selectedOption === option 
                          ? 'border-primary bg-primary text-white' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                
                {selectedOption === 'その他' && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      その他の場合、詳細を入力してください
                    </label>
                    <input
                      type="text"
                      value={customAnswer}
                      onChange={handleFreeTextChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="詳細を入力"
                    />
                  </div>
                )}
              </div>
            )}
            
            {currentQuestion.type === 'free-text' && (
              <div className="mt-4">
                {currentQuestion.id === 'story' ? (
                  <textarea
                    value={customAnswer}
                    onChange={handleFreeTextChange}
                    className="w-full h-32 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="思い出を自由に入力してください"
                  />
                ) : (
                  <input
                    type="text"
                    value={customAnswer}
                    onChange={handleFreeTextChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="回答を入力"
                  />
                )}
              </div>
            )}
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
              className={`px-6 py-2 rounded-lg ${
                currentQuestionIndex === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              前へ
            </button>
            
            <button
              onClick={handleNextQuestion}
              disabled={
                (currentQuestion.type === 'multiple-choice' && !selectedOption) ||
                (selectedOption === 'その他' && !customAnswer) ||
                (currentQuestion.type === 'free-text' && !customAnswer)
              }
              className={`px-6 py-2 rounded-lg ${
                (currentQuestion.type === 'multiple-choice' && !selectedOption) ||
                (selectedOption === 'その他' && !customAnswer) ||
                (currentQuestion.type === 'free-text' && !customAnswer)
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-opacity-90'
              }`}
            >
              {currentQuestionIndex < questionFlow.length - 1 ? '次へ' : '完了'}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateStory; 