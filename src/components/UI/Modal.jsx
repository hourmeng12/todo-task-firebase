import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';

const Modal = ({ isOpen, onClose, afterLeave, children }) => {
  return (
    <Transition show={isOpen} as={Fragment} afterLeave={afterLeave}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-linear duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto pt-10">
          <div className="flex min-h-full w-full items-end justify-center text-center lg:items-start">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-300"
              enterFrom="opacity-0 translate-y-1/2"
              enterTo="opacity-100 translate-y-0"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-full"
            >
              <Dialog.Panel className="w-full rounded-t-2xl bg-white px-4 py-6 text-left align-middle shadow-xl transition-all duration-200 dark:bg-zinc-800 lg:max-w-lg lg:rounded-b-2xl">
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute top-2 right-2 h-6 rounded-md bg-zinc-900/5 px-1 transition-all duration-200 hover:bg-zinc-900/10 dark:bg-white/10 dark:hover:bg-white/20"
                >
                  <XIcon className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                </button>
                <div className="mt-4">{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
