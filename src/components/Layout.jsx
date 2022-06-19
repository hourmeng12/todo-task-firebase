import React from 'react';
import { useSelector } from 'react-redux';
import { selectInitial } from '../features/ui/uiSlice';

import Navbar from './Navbar';

const Layout = ({ children }) => {
  const isInitial = useSelector(selectInitial);

  if (!isInitial) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <main className="flex min-h-screen bg-zinc-100 pt-14 transition-colors duration-200 child:w-full dark:bg-zinc-900">
      <Navbar />
      {children}
    </main>
  );
};

export default Layout;
