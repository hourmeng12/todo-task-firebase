import React from 'react';

const Button = ({ className, children, ...rest }) => {
  return (
    <button
      className={`inline-flex h-10 min-w-[2.5rem] items-center justify-center rounded-lg border border-zinc-900/10 text-zinc-700 transition-all duration-200 dark:border-white/10 dark:text-zinc-200 ${
        className ? className : ''
      }`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
