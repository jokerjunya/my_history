import React, { useRef, ChangeEvent } from 'react';

interface UploadButtonProps {
  onImageUpload: (file: File) => void;
}

const UploadButton: React.FC<UploadButtonProps> = ({ onImageUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onImageUpload(files[0]);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="text-center">
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={handleButtonClick}
        className="bg-primary hover:bg-opacity-90 text-white font-bold py-4 px-8 rounded-lg shadow-md text-xl flex items-center justify-center mx-auto"
      >
        <span className="mr-2">📷</span>
        写真をアップロード
      </button>
      <p className="mt-3 text-gray-500">
        写真をアップロードして思い出を残しましょう
      </p>
    </div>
  );
};

export default UploadButton; 