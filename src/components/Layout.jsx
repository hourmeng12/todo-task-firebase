import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectInitial, initial } from '../features/ui/uiSlice';
import { auth } from '../app/firebase';
import { loading, login } from '../features/user/userSlice';
import { onAuthStateChanged } from 'firebase/auth';

import useScrollToTop from '../hooks/useScrollToTop';
import Navbar from './Navbar';
import useDarkMode from '../hooks/useDarkMode';

const Layout = ({ children }) => {
  useDarkMode();
  useScrollToTop();
  const isInitial = useSelector(selectInitial);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(loading());
        dispatch(login(user));
      }
      dispatch(initial());
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  if (!isInitial) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white text-zinc-900 transition-colors duration-200 dark:bg-zinc-900 dark:text-zinc-200">
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
