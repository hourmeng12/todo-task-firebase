import React, { Fragment } from 'react';
import useDarkMode from '../hooks/useDarkMode';
import { Transition } from '@headlessui/react';
import { MoonIcon } from '@heroicons/react/solid';
import { SunIcon } from '@heroicons/react/outline';
import Button from './UI/Button';

const ThemeToggleButton = () => {
  const [darkTheme, setDarkTheme] = useDarkMode('#f4f4f5', '#18181b');

  const handleMode = () => setDarkTheme(!darkTheme);

  return (
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
        show={darkTheme ?? false}
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
  );
};

export default ThemeToggleButton;
