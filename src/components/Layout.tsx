import React, { ReactNode } from 'react';
import Head from 'next/head';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = 'マイヒストリー' }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="思い出を残して自分史を作成するアプリ" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow container mx-auto px-4 py-6">
          {children}
        </main>
        
        <footer className="bg-white border-t py-6">
          <div className="container mx-auto px-4 text-center text-gray-500">
            <p>マイヒストリー &copy; {new Date().getFullYear()}</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout; 