import React, { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  ClipboardCheckIcon,
  InboxIcon,
  LogoutIcon,
  PlusIcon,
  StarIcon,
} from '@heroicons/react/outline';

import defaultListsId from '../constant/defaultListId';
import useWindowDimensions from '../hooks/useWindowDimensions';
import Button from './UI/Button';
import Modal from './UI/Modal';
import { logoutUser } from '../features/user/userActions';
import { selectListLoading, selectLists } from '../features/todo/todoSlice';
import ListOption from './List/ListOption';
import ListModal from './List/ListModal';

const Menu = ({ isOpen, closeSidebar }) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const [isMobile, setIsMobile] = useState(false);
  const [openModal, setOpenModal] = useState(false);
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

  const handleopenModal = () => {
    setOpenModal(true);
  };

  const handlecloseModal = () => {
    setOpenModal(false);
  };

  // Mobile Menu
  if (isMobile) {
    return (
      <Modal isOpen={isOpen} onClose={closeSidebar}>
        {listLoading ? (
          <MenuListSkeleton />
        ) : (
          <>
            <MenuNav to="inbox">
              <div className="flex items-center">
                <InboxIcon className="mr-2 h-5 w-5 stroke-[1.5] text-sky-500" />
                Inbox
              </div>
            </MenuNav>
            <MenuNav to="important">
              <div className="flex items-center">
                <StarIcon className="mr-2 h-5 w-5 stroke-[1.5] text-orange-500" />
                Important
              </div>
            </MenuNav>
            <MenuNav to="tasks">
              <div className="flex items-center">
                <ClipboardCheckIcon className="mr-2 h-5 w-5 stroke-[1.5] text-violet-500" />
                Tasks
              </div>
            </MenuNav>
            <div className="mt-2 border-t border-zinc-900/10 pt-2 dark:border-zinc-50/10">
              {/* Default List = 3 */}
              {lists.length > 3 ? (
                lists.map((list) => {
                  if (defaultListsId.includes(list.id)) {
                    return null;
                  }

                  return (
                    <MenuNav
                      key={list.id}
                      to={list.id}
                      theme={list.theme}
                      tasksCount={list.tasksCount}
                    >
                      {list.name}
                    </MenuNav>
                  );
                })
              ) : (
                <div className="flex h-[30vh] items-center justify-center">
                  <p className="text-zinc-900 dark:text-zinc-200">
                    Empty List!
                  </p>
                </div>
              )}
              <button
                className="inline-flex w-full items-center justify-center rounded-xl border border-zinc-900/10 bg-transparent px-3 py-2 text-zinc-900 hover:bg-zinc-200 dark:border-zinc-50/10 dark:text-zinc-200 dark:hover:bg-zinc-700"
                onClick={handleopenModal}
              >
                <PlusIcon className="mr-2 h-4 w-4" />
                New List
              </button>
              <ListModal isAdd isOpen={openModal} onClose={handlecloseModal} />
            </div>
          </>
        )}

        <div className="mt-6 flex flex-col">
          <Button
            onClick={handleLogout}
            className="hover:bg-zinc-200 dark:hover:bg-zinc-700"
          >
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
      appear
      show={isOpen}
      enter="duration-200 ease-in-out"
      enterFrom="-translate-x-full opacity-0"
      enterTo="translate-x-0 opacity-100"
      leave="duration-200 delay-75 ease-in-out"
      leaveFrom="translate-x-0 opacity-100"
      leaveTo="-translate-x-full opacity-0"
      style={{
        width: isOpen ? '100%' : '0px',
      }}
      className="sticky top-14 hidden max-h-[calc(100vh-3.5rem)] max-w-md bg-white/50 transition-all duration-200 dark:bg-zinc-800/10 lg:flex lg:flex-col"
    >
      <div className="mt-2 h-full overflow-y-auto px-2">
        {listLoading ? (
          <MenuListSkeleton />
        ) : (
          <>
            <MenuNav to="inbox">
              <div className="flex items-center">
                <InboxIcon className="mr-2 h-5 w-5 stroke-[1.5] text-sky-500" />
                Inbox
              </div>
            </MenuNav>
            <MenuNav to="important">
              <div className="flex items-center">
                <StarIcon className="mr-2 h-5 w-5 stroke-[1.5] text-orange-500" />
                Important
              </div>
            </MenuNav>
            <MenuNav to="tasks">
              <div className="flex items-center">
                <ClipboardCheckIcon className="mr-2 h-5 w-5 stroke-[1.5] text-violet-500" />
                Tasks
              </div>
            </MenuNav>
            <div className="mt-2 border-t border-zinc-900/10 pt-2 pb-6 dark:border-zinc-50/10">
              {/* Default List = 3 */}
              {lists.length > 3 ? (
                lists.map((list) => {
                  if (defaultListsId.includes(list.id)) {
                    return null;
                  }

                  return (
                    <MenuNav
                      key={list.id}
                      to={list.id}
                      theme={list.theme}
                      tasksCount={list.tasksCount}
                      option
                    >
                      {list.name}
                    </MenuNav>
                  );
                })
              ) : (
                <div className="flex h-[30vh] items-center justify-center">
                  <p className="text-zinc-900 dark:text-zinc-200">
                    Empty List!
                  </p>
                </div>
              )}
              <button
                className="inline-flex w-full items-center justify-center rounded-xl border border-zinc-900/10 bg-transparent px-3 py-2 text-zinc-900 hover:bg-zinc-200 dark:border-zinc-50/10 dark:text-zinc-200 dark:hover:bg-zinc-700"
                onClick={handleopenModal}
              >
                <PlusIcon className="mr-2 h-4 w-4" />
                New List
              </button>
              <ListModal isAdd isOpen={openModal} onClose={handlecloseModal} />
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col px-2 py-4">
        <Button
          onClick={handleLogout}
          className="hover:bg-zinc-200 dark:hover:bg-zinc-700"
        >
          <LogoutIcon className="mr-4 h-5 w-5" />
          Logout
        </Button>
      </div>
    </Transition>
  );
};

const MenuNav = ({ theme, to, option, children }) => {
  const id = to;
  return (
    <div className="relative flex items-center">
      <NavLink
        to={`/${to}`}
        className={({ isActive }) =>
          `${
            isActive
              ? 'bg-zinc-200 dark:bg-zinc-700'
              : 'bg-transparent hover:bg-zinc-200 dark:hover:bg-zinc-700'
          } relative flex w-full items-center justify-between rounded-xl p-3 text-zinc-900 transition-colors duration-200 dark:text-zinc-200`
        }
      >
        <div className="mr-6 inline-flex items-center">
          {theme && (
            <span
              style={{
                backgroundColor: theme,
              }}
              className="mr-2 h-5 w-5 flex-shrink-0 select-none rounded-md"
            >
              &nbsp;
            </span>
          )}
          <div className="line-clamp-1">{children}</div>
        </div>
      </NavLink>
      <div className="absolute right-2 flex items-center space-x-2">
        {option && (
          <ListOption
            buttonClassName="border-none"
            id={id}
            name={children}
            theme={theme}
          />
        )}
      </div>
    </div>
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
