import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteList } from '../../features/todo/listActions';

import Button from '../UI/Button';
import Modal from '../UI/Modal';

const DeleteListModal = ({ id, name, isOpen, onClose }) => {
  const dispatch = useDispatch();

  const handleDeleteList = (event) => {
    event.preventDefault();

    dispatch(deleteList(id));
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleDeleteList}>
        <div>
          <h2 className="text-center text-xl text-zinc-900 dark:text-zinc-200">
            Delete List
          </h2>
          <div className="mt-4 flex text-zinc-700 dark:text-zinc-400">
            <p className="line-clamp-1">
              <span>Are you sure you want to delele&nbsp;</span>
              <span className="text-base font-medium text-zinc-900 dark:text-zinc-200">
                {name}
              </span>
            </p>
            <span className="w-10">?</span>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-end space-x-2">
          <Button
            type="button"
            onClick={onClose}
            className="px-4 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-700"
          >
            Cancel
          </Button>
          <Button className="bg-red-500 px-4 font-medium text-white hover:bg-red-600">
            Delete
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default DeleteListModal;
