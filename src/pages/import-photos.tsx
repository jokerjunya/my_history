import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

const ImportPhotos: React.FC = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const files = Array.from(e.target.files);
    
    // 画像ファイルのみを許可
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    if (imageFiles.length !== files.length) {
      setErrorMessage('画像ファイルのみアップロードできます');
      return;
    }
    
    // 選択されたファイルを保存
    setSelectedFiles(prevFiles => [...prevFiles, ...imageFiles]);
    
    // プレビュー用のURLを生成
    const newPreviewUrls = imageFiles.map(file => URL.createObjectURL(file));
    setPreviewUrls(prevUrls => [...prevUrls, ...newPreviewUrls]);
    
    // エラーメッセージをクリア
    setErrorMessage('');
    
    // ファイル入力をリセット
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveFile = (index: number) => {
    // プレビューURLを解放
    URL.revokeObjectURL(previewUrls[index]);
    
    // 配列から削除
    setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    setPreviewUrls(prevUrls => prevUrls.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setErrorMessage('アップロードする写真を選択してください');
      return;
    }
    
    setIsUploading(true);
    
    try {
      // 実際の実装では、ここでファイルをサーバーにアップロードし、
      // 保存された画像URLを受け取る処理を行います
      
      // この例ではプレビューURLをローカルストレージに保存して模擬的に実装
      const savedImages = JSON.parse(localStorage.getItem('importedImages') || '[]');
      
      // 新しい画像情報を作成
      const newImages = selectedFiles.map((file, index) => ({
        id: `img_${Date.now()}_${index}`,
        name: file.name,
        url: previewUrls[index], // 実際の実装ではサーバーから返されたURLを使用
        uploadedAt: new Date().toISOString()
      }));
      
      // ローカルストレージに保存
      localStorage.setItem('importedImages', JSON.stringify([...newImages, ...savedImages]));
      
      // すべてのプレビューURLを解放
      previewUrls.forEach(url => URL.revokeObjectURL(url));
      
      // 成功メッセージを表示
      alert('写真のインポートが完了しました！');
      
      // ホームページにリダイレクト
      router.push('/');
    } catch (error) {
      console.error('アップロードエラー:', error);
      setErrorMessage('写真のアップロード中にエラーが発生しました。もう一度お試しください。');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!e.dataTransfer.files || e.dataTransfer.files.length === 0) return;
    
    const files = Array.from(e.dataTransfer.files);
    
    // 画像ファイルのみを許可
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    if (imageFiles.length !== files.length) {
      setErrorMessage('画像ファイルのみアップロードできます');
      return;
    }
    
    // 選択されたファイルを保存
    setSelectedFiles(prevFiles => [...prevFiles, ...imageFiles]);
    
    // プレビュー用のURLを生成
    const newPreviewUrls = imageFiles.map(file => URL.createObjectURL(file));
    setPreviewUrls(prevUrls => [...prevUrls, ...newPreviewUrls]);
    
    // エラーメッセージをクリア
    setErrorMessage('');
  };

  return (
    <Layout title="写真をインポート">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">思い出の写真をインポート</h1>
        
        {/* 写真アップロードエリア */}
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6 cursor-pointer hover:border-primary transition-colors"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            multiple
            className="hidden"
          />
          
          <div className="flex flex-col items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              写真をドラッグ＆ドロップ
            </h3>
            
            <p className="text-gray-500 mb-4">
              またはクリックして写真を選択
            </p>
            
            <button
              type="button"
              className="bg-primary hover:bg-opacity-90 text-white font-medium py-2 px-4 rounded-md"
            >
              写真を選択
            </button>
          </div>
        </div>
        
        {/* エラーメッセージ */}
        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md mb-6">
            {errorMessage}
          </div>
        )}
        
        {/* 選択された写真のプレビュー */}
        {previewUrls.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              選択された写真 ({previewUrls.length}枚)
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={url} 
                      alt={`プレビュー ${index + 1}`} 
                      className="object-cover w-full h-full"
                    />
                  </div>
                  
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile(index);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* アクションボタン */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg"
          >
            キャンセル
          </button>
          
          <button
            type="button"
            onClick={handleUpload}
            disabled={previewUrls.length === 0 || isUploading}
            className={`font-medium py-3 px-6 rounded-lg ${
              previewUrls.length === 0 || isUploading
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-primary hover:bg-opacity-90 text-white'
            }`}
          >
            {isUploading ? 'アップロード中...' : '写真をインポート'}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ImportPhotos; 