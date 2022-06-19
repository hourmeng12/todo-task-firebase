import { Menu } from '@headlessui/react';
import React from 'react';

const DropDownMenu = ({ buttonClassName, items, children }) => {
  return (
    <Menu as="div" className="relative inline-block items-center">
      <div className="flex h-full items-center">
        <Menu.Button
          className={`inline-flex items-center justify-center rounded-lg text-zinc-700 transition-colors duration-200 focus-visible:outline-none dark:border-white/10 dark:text-zinc-200 ${
            buttonClassName ? buttonClassName : ''
          }`}
        >
          {children}
        </Menu.Button>
      </div>
      <Menu.Items className="absolute right-0 z-20 mt-2 w-56 rounded-lg border border-zinc-900/10 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:border-white/10 dark:bg-zinc-800">
        <div className="p-1">
          {items.map((item, index) => (
            <Menu.Item key={index}>
              {({ active }) => (
                <button
                  onClick={item.onClick}
                  className={`flex w-full cursor-pointer items-center rounded-lg p-2 ${
                    active
                      ? 'bg-zinc-900/5 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-200'
                      : 'bg-white text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300'
                  }`}
                >
                  {item.icon}
                  {item.text}
                </button>
              )}
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Menu>
  );
};

export default DropDownMenu;
