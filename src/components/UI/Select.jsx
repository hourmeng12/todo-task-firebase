import { Listbox } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/outline';
import React from 'react';

const Select = ({
  label,
  value,
  onChange,
  options,
  selectContainerClassName,
  labelContainerClassName,
}) => {
  return (
    <Listbox value={value} onChange={onChange}>
      <div
        className={`flex items-center ${
          labelContainerClassName ? labelContainerClassName : ''
        }`}
      >
        <Listbox.Label className="text-zinc-900 dark:text-zinc-200">
          {label}
        </Listbox.Label>
      </div>
      <div
        className={`relative ${
          selectContainerClassName ? selectContainerClassName : ''
        }`}
      >
        <Listbox.Button className="w-full cursor-pointer rounded-md border border-zinc-900/10 py-1 text-zinc-600 hover:text-zinc-700 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:text-zinc-200">
          {value}
        </Listbox.Button>
        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-zinc-900/10 bg-white py-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:border-white/10 dark:bg-zinc-800 sm:text-sm">
          {options.map((value, index) => (
            <Listbox.Option
              key={index}
              value={value}
              className={({ active }) =>
                `relative cursor-pointer py-2 px-4 pl-8 ${
                  active
                    ? 'bg-zinc-900/5 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-200'
                    : 'bg-white text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300'
                }`
              }
            >
              {({ selected }) => (
                <>
                  <span>{value}</span>
                  {selected ? (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                      <CheckIcon className="h-4 w-4 text-zinc-900 dark:text-white" />
                    </span>
                  ) : null}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
};

export default Select;
