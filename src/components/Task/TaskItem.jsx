import React from 'react';

import { CheckIcon } from '@heroicons/react/outline';
import TaskOption from './TaskOption';

export const TaskItem = ({ id, theme, isCompleted, onToggle, children }) => {
  const handleToggle = () => {
    onToggle({
      id,
      completed: isCompleted,
    });
  };

  return (
    <div className="flex w-full items-center justify-between rounded-xl bg-white px-3 py-3 text-zinc-700 transition-all duration-200 dark:bg-zinc-800 dark:text-zinc-200">
      <div className="flex items-center">
        <button
          style={{ borderColor: theme }}
          className="group relative mr-2 h-5 w-5 rounded-md border-2 hover:bg-opacity-50"
          onClick={handleToggle}
        >
          <span
            style={{
              backgroundColor: theme,
            }}
            className={`${
              isCompleted
                ? 'opacity-100 group-hover:opacity-80'
                : 'opacity-10 group-hover:opacity-30'
            } absolute inset-0 flex scale-110 items-center justify-center rounded transition-all duration-200`}
          >
            {isCompleted ? (
              <CheckIcon className="h-4 w-4 text-white dark:text-zinc-900" />
            ) : (
              <>&nbsp;</>
            )}
          </span>
        </button>
        <span className={isCompleted ? 'line-through opacity-80' : ''}>
          {children}
        </span>
      </div>
      <TaskOption id={id} name={children} theme={theme} />
    </div>
  );
};
