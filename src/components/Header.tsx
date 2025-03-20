import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Header: React.FC = () => {
  const router = useRouter();
  
  return (
    <header className="bg-white shadow-md py-4 mb-6 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary flex items-center">
          <span>📚 マイヒストリー</span>
        </Link>
        
        <nav className="flex space-x-4">
          <Link
            href="/"
            className={`text-lg py-2 px-3 rounded-md ${
              router.pathname === '/' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            ホーム
          </Link>
          <Link
            href="/add-memory"
            className={`text-lg py-2 px-3 rounded-md ${
              router.pathname === '/add-memory' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            思い出を追加
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header; 