import React, { useEffect, useState } from 'react';
import {
  ClipboardCheckIcon,
  InboxIcon,
  PlusIcon,
  StarIcon,
} from '@heroicons/react/outline';
import { useDispatch, useSelector } from 'react-redux';

import ListItem from '../components/List/ListItem';
import List from '../components/List/List';
import ListModal from '../components/List/ListModal';
import { Outlet, useParams } from 'react-router-dom';
import { getAllLists } from '../features/todo/listActions';
import { selectListLoading, selectLists } from '../features/todo/todoSlice';
import ListSkeleton from '../components/List/ListSkeleton';

const TodoList = () => {
  const { listId } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const lists = useSelector(selectLists);
  const listLoading = useSelector(selectListLoading);
  const dispatch = useDispatch();

  //default lists
  const inboxList = lists.find((list) => list.id === 'inbox');
  const importantList = lists.find((list) => list.id === 'important');
  const tasksList = lists.find((list) => list.id === 'tasks');

  useEffect(() => {
    dispatch(getAllLists());
  }, [dispatch]);

  if (listId) {
    return <Outlet />;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 pb-6 transition-all duration-200">
      {listLoading || listLoading === null ? (
        <ListSkeleton />
      ) : (
        <>
          <div className="mt-4 space-y-2 lg:mt-8">
            <ListItem id="inbox" tasksCount={inboxList?.tasksCount}>
              <div className="flex items-center">
                <InboxIcon className="mr-2 h-5 w-5 stroke-[1.5] text-sky-500" />
                Inbox
              </div>
            </ListItem>
            <ListItem id="important" tasksCount={importantList?.tasksCount}>
              <div className="flex items-center">
                <StarIcon className="mr-2 h-5 w-5 stroke-[1.5] text-orange-500" />
                Important
              </div>
            </ListItem>
            <ListItem id="tasks" tasksCount={tasksList?.tasksCount}>
              <div className="flex items-center">
                <ClipboardCheckIcon className="mr-2 h-5 w-5 stroke-[1.5] text-violet-500" />
                Tasks
              </div>
            </ListItem>
          </div>

          <div className="mt-6 space-y-2">
            <div className="flex justify-between">
              <h2 className="ml-2 text-lg font-medium text-zinc-700 dark:text-zinc-200">
                Lists
              </h2>
              <button
                onClick={openModal}
                className="mr-3 text-zinc-700 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                <PlusIcon className="h-4 w-4" />
              </button>
              <ListModal isAdd isOpen={isOpen} onClose={closeModal} />
            </div>
            {lists.length > 3 ? (
              <List lists={lists} />
            ) : (
              <div className="flex flex-col items-center">
                <div className="flex h-[30vh] items-center justify-center">
                  <p className="text-zinc-900 dark:text-zinc-200">
                    Empty List!
                  </p>
                </div>

                <button
                  className="mt-2 inline-flex items-center justify-center rounded-xl border border-zinc-900/10 bg-white px-12 py-2 text-zinc-900 transition-colors duration-200 hover:bg-zinc-200 dark:border-zinc-50/10 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
                  onClick={openModal}
                >
                  <PlusIcon className="mr-2 h-4 w-4" />
                  New List
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TodoList;
