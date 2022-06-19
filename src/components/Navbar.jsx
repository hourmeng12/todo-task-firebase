import React, { useState, Fragment } from 'react';
import { CollectionIcon, MenuIcon, SunIcon } from '@heroicons/react/outline';
import { MoonIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';
import { Transition } from '@headlessui/react';
import { useSelector } from 'react-redux';

import Button from './UI/Button';
import Menu from './Menu';
import useDarkMode from '../hooks/useDarkMode';
import { selectUser } from '../features/user/userSlice';

const Navbar = () => {
  const user = useSelector(selectUser);
  const [isOpen, setIsOpen] = useState(false);
  const [darkTheme, setDarkTheme] = useDarkMode();

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const handleMode = () => setDarkTheme(!darkTheme);

  return (
    <>
      <div className="fixed top-0 left-0 z-40 flex w-full items-center justify-between bg-white/50 p-2 text-zinc-700 backdrop-blur-sm transition-all duration-200 dark:bg-zinc-900/50 dark:text-zinc-200">
        {user && (
          <div>
            <Button onClick={toggleMenu}>
              <MenuIcon className="h-5 w-5" />
            </Button>
          </div>
        )}
        <Link
          to="/"
          className="inline-flex h-10 min-w-[2.5rem] items-center justify-center"
        >
          <CollectionIcon className="mr-1 h-5 w-5 stroke-[1.5]" />
          <h1 className="text-lg font-medium">Todo</h1>
        </Link>
        <div>
          <Button
            onClick={handleMode}
            className={`
              ${
                darkTheme
                  ? 'bg-amber-200 hover:bg-amber-300'
                  : 'bg-violet-500 hover:bg-violet-600'
              } max-w-[2.5rem] overflow-hidden`}
          >
            <Transition
              as={Fragment}
              show={darkTheme}
              enter="transform duration-500 ease-in-out"
              enterFrom="rotate-[-360deg] opacity-0"
              enterTo="rotate-0 opacity-100"
              leave="transform duration-75 ease-in"
              leaveFrom="rotate-0 opacity-100"
              leaveTo="rotate-[-180deg] opacity-0"
            >
              <SunIcon className="h-5 w-5 text-zinc-900" />
            </Transition>
            <Transition
              as={Fragment}
              show={!darkTheme}
              enter="transform duration-300 ease-in-out"
              enterFrom="rotate-[-160deg] opacity-0"
              enterTo="rotate-0 opacity-100"
              leave="transform duration-75 ease-in"
              leaveFrom="rotate-0 opacity-100"
              leaveTo="rotate-[-180deg] opacity-0"
            >
              <MoonIcon className="h-5 w-5 text-white" />
            </Transition>
          </Button>
        </div>
      </div>

      <Menu isOpen={isOpen} closeSidebar={closeSidebar} />
    </>
  );
};

export default Navbar;
