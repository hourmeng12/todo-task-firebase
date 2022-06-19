import React from 'react';

const TaskSkeleton = () => {
  return (
    <>
      <div className="mt-4 flex items-center justify-between lg:mt-8">
        <div className="h-10 w-screen max-w-xs animate-pulse cursor-default rounded-xl bg-white dark:bg-zinc-800">
          &nbsp;
        </div>
        <div className="flex space-x-2">
          <div className="h-10 w-10 animate-pulse cursor-default rounded-xl bg-white dark:bg-zinc-800">
            &nbsp;
          </div>
          <div className="h-10 w-10 animate-pulse cursor-default rounded-xl bg-white dark:bg-zinc-800">
            &nbsp;
          </div>
        </div>
      </div>
      <ul className="mt-8 space-y-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <li key={`task-${index}`}>
            <div className="h-12 w-full animate-pulse cursor-default rounded-xl bg-white dark:bg-zinc-800">
              &nbsp;
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TaskSkeleton;
