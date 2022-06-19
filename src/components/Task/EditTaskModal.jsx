import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateTask } from '../../features/todo/tasksActions';

import Button from '../UI/Button';
import Modal from '../UI/Modal';

const EditTaskModal = ({ id, task = '', theme, isOpen, onClose }) => {
  const [enteredTask, setEnteredTask] = useState(task);
  const { listId } = useParams();
  const dispatch = useDispatch();

  const handelUpdateTask = (event) => {
    event.preventDefault();

    dispatch(updateTask(listId, { id, task: enteredTask }));
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handelUpdateTask}>
        <div className="space-y-1">
          <label htmlFor="task">Task</label>
          <input
            type="text"
            name="task"
            id="task"
            style={{
              borderColor: theme,
            }}
            className="border-2"
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
          <Button className="bg-green-500 px-4 font-medium text-white hover:bg-red-600">
            Edit
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditTaskModal;
