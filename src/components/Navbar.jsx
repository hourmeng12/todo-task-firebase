import React, { useState } from 'react';
import { CollectionIcon, MenuIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Button from './UI/Button';
import Menu from './Menu';
import { selectUser } from '../features/user/userSlice';
import { useCallback } from 'react';
import ThemeToggleButton from './ThemeToggleButton';

const Navbar = () => {
  const user = useSelector(selectUser);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeSidebar = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 z-40 flex w-full items-center justify-between bg-white/50 p-2 text-zinc-700 backdrop-blur-sm transition-all duration-200 dark:bg-zinc-900/50 dark:text-zinc-200">
        {user && (
          <div>
            <Button
              className="hover:bg-zinc-100 dark:hover:bg-zinc-800"
              onClick={toggleMenu}
            >
              <MenuIcon className="h-5 w-5" />
            </Button>
          </div>
        )}
        <Link
          to="/"
          className="group inline-flex h-10 min-w-[2.5rem] items-center justify-center"
        >
          <CollectionIcon className="mr-1 h-5 w-5 stroke-[1.5] transition-transform duration-200 group-hover:scale-110" />
          <h1 className="text-lg font-medium">Todo</h1>
        </Link>
        <div>
          <ThemeToggleButton />
        </div>
      </div>

      <Menu isOpen={isOpen} closeSidebar={closeSidebar} />
    </>
  );
};

export default Navbar;
