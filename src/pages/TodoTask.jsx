import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import Task from '../components/Task/Task';
import SortTask from '../components/Task/SortTask';
import {
  selectLists,
  selectListLoading,
  selectTaskLoading,
} from '../features/todo/todoSlice';
import { getAllTasks } from '../features/todo/tasksActions';
import AddTask from '../components/Task/AddTask';
import ListOption from '../components/List/ListOption';
import TaskSkeleton from '../components/Task/TaskSkeleton';
import TogglePanel from '../components/UI/TogglePanel';

const TodoTask = () => {
  const { listId } = useParams();
  const lists = useSelector(selectLists);
  const listLoading = useSelector(selectListLoading);
  const taskLoading = useSelector(selectTaskLoading);
  const list = lists.find((list) => list.id === listId);
  const activeTasks = list?.tasks?.filter((task) => !task.completed) ?? [];
  const completedTasks = list?.tasks?.filter((task) => task.completed) ?? [];
  const dispatch = useDispatch();

  useEffect(() => {
    if (listLoading === false) {
      dispatch(getAllTasks(listId));
    }
  }, [dispatch, listId, listLoading]);

  if (listLoading || taskLoading) {
    return (
      <div className="mx-auto max-w-4xl px-4 transition-all duration-200">
        <TaskSkeleton />
      </div>
    );
  }

  if (!list) {
    return (
      <div className="mx-auto max-w-4xl py-8 px-4 text-center transition-all duration-200">
        <p className="text-zinc-900 dark:text-zinc-200">
          No list found! Try navigate to another list or add new list
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 transition-all duration-200">
      <div className="mt-4 flex items-center justify-between lg:mt-8">
        <h2 className="text-2xl font-medium text-zinc-900 line-clamp-2 dark:text-zinc-200">
          {list?.name ? list.name : ''}
        </h2>
        <div className="flex items-center space-x-1">
          <SortTask />
          <ListOption
            id={list.id}
            name={list.name}
            theme={list.theme}
            buttonClassName="inline-flex h-10 min-w-[2.5rem] items-center justify-center rounded-lg border border-zinc-900/10 bg-white/5 text-zinc-700 transition-colors duration-200 hover:bg-white/20 focus-visible:outline-none dark:border-white/10 dark:bg-white/5 dark:text-zinc-200 dark:hover:bg-white/10"
          />
        </div>
      </div>

      <div className="mt-8 pb-6">
        <div className="space-y-2">
          <AddTask theme={list.theme} />
          <Task tasks={activeTasks} theme={list.theme} />
        </div>
        {completedTasks.length > 0 && (
          <div className="mt-4">
            <TogglePanel button="Completed">
              <Task tasks={completedTasks} theme={list.theme} />
            </TogglePanel>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoTask;
