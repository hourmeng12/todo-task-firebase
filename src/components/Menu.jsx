import React, { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import {
  ClipboardCheckIcon,
  InboxIcon,
  LogoutIcon,
  StarIcon,
} from '@heroicons/react/outline';
import { useDispatch, useSelector } from 'react-redux';

import defaultListsId from '../constant/defaultListId';
import useWindowDimensions from '../hooks/useWindowDimensions';
import ListItem from './List/ListItem';
import Button from './UI/Button';
import Modal from './UI/Modal';
import { logoutUser } from '../features/user/userActions';
import { selectListLoading, selectLists } from '../features/todo/todoSlice';
import { useLocation } from 'react-router-dom';

const Menu = ({ isOpen, closeSidebar }) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const [isMobile, setIsMobile] = useState(false);
  const lists = useSelector(selectLists);
  const listLoading = useSelector(selectListLoading);

  const handleLogout = () => {
    dispatch(logoutUser());
    closeSidebar();
  };

  useEffect(() => {
    if (isMobile) {
      closeSidebar();
    }
  }, [pathname, isMobile, closeSidebar]);

  useEffect(() => {
    if (width < 1024) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [width]);

  // Mobile Menu
  if (isMobile) {
    return (
      <Modal isOpen={isOpen} onClose={closeSidebar}>
        {listLoading ? (
          <MenuListSkeleton />
        ) : (
          <>
            <ListItem id="inbox">
              <InboxIcon className="mr-2 h-5 w-5 stroke-[1.5] text-sky-500" />
              Inbox
            </ListItem>
            <ListItem id="important">
              <StarIcon className="mr-2 h-5 w-5 stroke-[1.5] text-orange-500" />
              Important
            </ListItem>
            <ListItem id="tasks">
              <ClipboardCheckIcon className="mr-2 h-5 w-5 stroke-[1.5] text-violet-500" />
              Tasks
            </ListItem>
            <div className="mt-2 border-t border-zinc-900/10 pt-2">
              {lists.map((list) => {
                if (defaultListsId.includes(list.id)) {
                  return null;
                }

                return (
                  <ListItem
                    key={list.id}
                    id={list.id}
                    theme={list.theme}
                    tasksCount={list.tasksCount}
                  >
                    {list.name}
                  </ListItem>
                );
              })}
            </div>
          </>
        )}

        <div className="mt-6 flex flex-col">
          <Button onClick={handleLogout}>
            <LogoutIcon className="mr-2 h-5 w-5" />
            Logout
          </Button>
        </div>
      </Modal>
    );
  }

  // Desktop Menu/Sidebar
  return (
    <Transition
      show={isOpen}
      enter="duration-200 ease-in-out"
      enterFrom="-translate-x-full opacity-0"
      enterTo="translate-x-0 opacity-100"
      leave="duration-200 delay-75 ease-in-out"
      leaveFrom="translate-x-0 opacity-100"
      leaveTo="-translate-x-full opacity-0"
      style={{
        width: isOpen ? '' : '0px',
      }}
      className="sticky top-14 hidden max-h-[calc(100vh-3.5rem)] max-w-md bg-white/50 transition-all duration-200 dark:bg-zinc-800/10 lg:flex lg:flex-col"
    >
      <div className="mt-2 h-full overflow-y-auto px-2">
        {listLoading ? (
          <MenuListSkeleton />
        ) : (
          <>
            <ListItem
              id="inbox"
              className="!bg-transparent hover:!bg-zinc-200 dark:!bg-transparent dark:hover:!bg-zinc-800"
            >
              <InboxIcon className="mr-2 h-5 w-5 stroke-[1.5] text-sky-500" />
              Inbox
            </ListItem>
            <ListItem
              id="important"
              className="!bg-transparent hover:!bg-zinc-200 dark:!bg-transparent dark:hover:!bg-zinc-800"
            >
              <StarIcon className="mr-2 h-5 w-5 stroke-[1.5] text-orange-500" />
              Important
            </ListItem>
            <ListItem
              id="tasks"
              className="!bg-transparent hover:!bg-zinc-200 dark:!bg-transparent dark:hover:!bg-zinc-800"
            >
              <ClipboardCheckIcon className="mr-2 h-5 w-5 stroke-[1.5] text-violet-500" />
              Tasks
            </ListItem>
            <div className="mt-2 border-t border-zinc-900/10 pt-2 pb-6">
              {lists.map((list) => {
                if (defaultListsId.includes(list.id)) {
                  return null;
                }

                return (
                  <ListItem
                    key={list.id}
                    id={list.id}
                    theme={list.theme}
                    tasksCount={list.tasksCount}
                    className="!bg-transparent hover:!bg-zinc-200 dark:!bg-transparent dark:hover:!bg-zinc-800"
                    option
                  >
                    {list.name}
                  </ListItem>
                );
              })}
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col px-2 py-4">
        <Button onClick={handleLogout}>
          <LogoutIcon className="mr-4 h-5 w-5" />
          Logout
        </Button>
      </div>
    </Transition>
  );
};

const MenuListSkeleton = () => {
  return (
    <>
      <ul className="space-y-1">
        {Array.from({ length: 3 }).map((_, index) => (
          <li key={`list-${index}`}>
            <div className="h-12 w-full animate-pulse cursor-default rounded-xl bg-zinc-100 dark:bg-zinc-800">
              &nbsp;
            </div>
          </li>
        ))}
      </ul>
      <ul className="mt-2 space-y-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <li key={`list-${index}`}>
            <div className="h-12 w-full animate-pulse cursor-default rounded-xl bg-zinc-100 dark:bg-zinc-800">
              &nbsp;
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Menu;
