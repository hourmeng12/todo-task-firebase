import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toggleTask } from '../../features/todo/tasksActions';
import { TaskItem } from './TaskItem';

const Task = ({ tasks, theme }) => {
  const { listId } = useParams();
  const dispatch = useDispatch();

  const handleToggle = (task) => {
    dispatch(toggleTask(listId, task));
  };

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskItem
            isCompleted={task.completed}
            id={task.id}
            theme={theme}
            onToggle={handleToggle}
          >
            {task.task}
          </TaskItem>
        </li>
      ))}
    </ul>
  );
};

export default Task;
