import React from 'react';

const ListSkeleton = () => {
  return (
    <>
      <ul className="mt-4 space-y-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <li key={`default-list-${index}`}>
            <div className="h-12 w-full animate-pulse cursor-default rounded-xl bg-white dark:bg-zinc-800">
              &nbsp;
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 space-y-2">
        <div className="h-7 w-48 animate-pulse cursor-default rounded-lg bg-white dark:bg-zinc-800">
          &nbsp;
        </div>
        <ul className="space-y-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <li key={`list-${index}`}>
              <div className="h-12 w-full animate-pulse cursor-default rounded-xl bg-white dark:bg-zinc-800">
                &nbsp;
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ListSkeleton;
