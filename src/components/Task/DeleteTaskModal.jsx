import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteTask } from '../../features/todo/tasksActions';

import Button from '../UI/Button';
import Modal from '../UI/Modal';

const DeleteTaskModal = ({ id, task, isOpen, onClose }) => {
  const { listId } = useParams();
  const dispatch = useDispatch();

  const handleDeleteTask = (event) => {
    event.preventDefault();

    dispatch(deleteTask(listId, id));
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleDeleteTask}>
        <div>
          <h2 className="text-center text-xl text-zinc-900 dark:text-zinc-200">
            Delete Task
          </h2>
          <div className="mt-4 flex text-zinc-700 dark:text-zinc-400">
            <p className="line-clamp-1">
              <span>Are you sure you want to delele&nbsp;</span>
              <span className="text-base font-medium text-zinc-900 dark:text-zinc-200">
                {task}
              </span>
            </p>
            <span className="w-10">?</span>
          </div>
          <p className="block text-zinc-700 dark:text-zinc-400">
            This action can not be undone.
          </p>
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

export default DeleteTaskModal;
