import React from 'react';
import { Link } from 'react-router-dom';
import ListOption from './ListOption';

const ListItem = ({ id, theme, tasksCount, option, className, children }) => {
  return (
    <div className="relative flex items-center">
      <Link
        to={`/${id}`}
        className={`relative flex w-full items-center rounded-xl bg-white px-3 py-3 text-zinc-700 transition-all duration-200 hover:cursor-pointer hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 ${
          className ? className : ''
        }`}
      >
        <div className="inline-flex items-center">
          {theme && (
            <span
              style={{
                backgroundColor: theme,
              }}
              className="mr-2 h-5 w-5 select-none rounded-md"
            >
              &nbsp;
            </span>
          )}
          {children}
        </div>
      </Link>
      <div className="absolute right-2 flex items-center space-x-2 ">
        {tasksCount && (
          <span className="inline-flex h-6 min-w-[1.25rem] items-center justify-center rounded-md bg-black/5 px-1 text-sm dark:bg-white/10">
            {tasksCount}
          </span>
        )}
        {option && (
          <ListOption
            buttonClassName="border-none"
            id={id}
            name={children}
            theme={theme}
          />
        )}
      </div>
    </div>
  );
};

export default ListItem;
