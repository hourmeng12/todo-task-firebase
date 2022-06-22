import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import React from 'react';

const TogglePanel = ({ button, children }) => {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="inline-flex items-center rounded-xl bg-white py-1.5 px-2.5 text-zinc-900 transition-colors duration-200 dark:bg-zinc-800 dark:text-zinc-200">
            {button}
            <span>
              <ChevronDownIcon
                className={`ml-2 h-4 w-4 transition-all duration-200 ${
                  open ? '-rotate-90' : ''
                }`}
              />
            </span>
          </Disclosure.Button>

          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel className="mt-2">{children}</Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export default TogglePanel;
