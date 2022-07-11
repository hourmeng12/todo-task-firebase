import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateTask } from '../../features/todo/tasksActions';

import Button from '../UI/Button';
import Modal from '../UI/Modal';

const EditTaskModal = ({ id, task = '', theme, isOpen, onClose }) => {
  let inputRef = useRef(null);
  const [enteredTask, setEnteredTask] = useState(task);
  const { listId } = useParams();
  const dispatch = useDispatch();

  const handelUpdateTask = (event) => {
    event.preventDefault();

    dispatch(updateTask(listId, { id, task: enteredTask }));
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      afterLeave={() => {
        setEnteredTask(task);
      }}
      initialFocus={inputRef}
    >
      <form onSubmit={handelUpdateTask}>
        <div className="space-y-1">
          <label
            className="font-medium text-zinc-900 dark:text-zinc-200"
            htmlFor="task"
          >
            Task
          </label>
          <input
            ref={inputRef}
            type="text"
            name="task"
            id="task"
            style={{
              borderColor: theme,
            }}
            className="border-2 bg-transparent"
            value={enteredTask}
            onChange={(e) => setEnteredTask(e.target.value)}
          />
        </div>
        <div className="mt-4 flex items-center justify-end space-x-2">
          <Button
            type="button"
            onClick={onClose}
            className="px-4 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-700"
          >
            Cancel
          </Button>
          <Button className="bg-teal-400 px-4 font-medium hover:bg-teal-500 dark:text-white">
            Edit
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditTaskModal;
