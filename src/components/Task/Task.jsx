import React from 'react';
import { TaskItem } from './TaskItem';

const Task = ({ tasks, theme }) => {
  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskItem isCompleted={task.completed} id={task.id} theme={theme}>
            {task.task}
          </TaskItem>
        </li>
      ))}
    </ul>
  );
};

export default Task;
