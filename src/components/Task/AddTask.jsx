import React, { useState } from 'react';
import { PlusIcon } from '@heroicons/react/outline';
import { useDispatch } from 'react-redux';
import { addTask } from '../../features/todo/tasksActions';
import { useParams } from 'react-router-dom';

const AddTask = ({ theme }) => {
  const { listId } = useParams();
  const [task, setTask] = useState('');
  const dispatch = useDispatch();

  const handleAddTask = (event) => {
    event.preventDefault();

    if (task.trim().length === 0) {
      return;
    }

    dispatch(addTask(listId, task));
    setTask('');
  };

  return (
    <div className="w-full">
      <form onSubmit={handleAddTask}>
        <div className="group relative flex items-center overflow-hidden rounded-xl border-2 border-white bg-transparent px-2.5 py-1.5 transition-colors duration-200 dark:border-zinc-800">
          <button
            type="submit"
            style={{
              backgroundColor: theme,
              borderColor: theme,
            }}
            className="relative z-10 inline-flex h-5 w-5 items-center justify-center rounded-md border-2"
          >
            <span>
              <PlusIcon className="h-4 w-4 text-white dark:text-zinc-900" />
            </span>
          </button>
          <input
            required
            className="peer z-10 border-0 bg-transparent"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            type="text"
            name="task"
            id="task"
          />
          <div className="absolute inset-0 bg-white opacity-0 transition-opacity duration-200 peer-focus:opacity-100 dark:bg-zinc-800">
            &nbsp;
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
