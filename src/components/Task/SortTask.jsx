import React, { useState } from 'react';
import { Popover } from '@headlessui/react';
import { SwitchVerticalIcon } from '@heroicons/react/outline';
import { usePopper } from 'react-popper';
import Select from '../UI/Select';
import { useDispatch } from 'react-redux';
import { getAllTasksBy } from '../../features/todo/tasksActions';
import { useParams } from 'react-router-dom';

const SORT_BY = [
  {
    text: 'Default',
    value: 'createdAt',
  },
  {
    text: 'Alphabetically',
    value: 'task',
  },
  {
    text: 'Creation Date',
    value: 'createdAt',
  },
];

const ORDER_BY = [
  {
    text: 'Ascending',
    value: 'asc',
  },
  {
    text: 'Descending',
    value: 'desc',
  },
];

const SortTask = () => {
  const [referenceElement, setReferenceElement] = useState();
  const [popperElement, setPopperElement] = useState();
  const { styles, attributes } = usePopper(referenceElement, popperElement);
  const [sortBy, setSortBy] = useState(SORT_BY[0]);
  const [orderBy, setOrderBy] = useState(ORDER_BY[0]);
  const { listId } = useParams();
  const dispatch = useDispatch();

  const handleSortBy = (sort) => {
    const taskQuery = {
      fieldPath: sort.value,
      direction: orderBy.value,
    };
    setSortBy(sort);
    dispatch(getAllTasksBy(listId, taskQuery));
  };

  const handleOrderBy = (order) => {
    const taskQuery = {
      fieldPath: sortBy.value,
      direction: order.value,
    };
    setOrderBy(order);
    dispatch(getAllTasksBy(listId, taskQuery));
  };

  return (
    <Popover className="relative">
      <Popover.Button
        ref={setReferenceElement}
        className="inline-flex h-10 min-w-[2.5rem] items-center justify-center rounded-lg border border-zinc-900/10 bg-white/5 text-zinc-700 transition-colors duration-200 hover:bg-zinc-200 focus-visible:outline-none dark:border-white/10 dark:bg-white/5 dark:text-zinc-200 dark:hover:bg-white/10"
      >
        <SwitchVerticalIcon className="h-5 w-5" />
      </Popover.Button>

      <Popover.Panel
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
        className="absolute left-1/2 z-20 w-screen max-w-xs -translate-x-1/2 transform px-4 sm:px-0"
      >
        <div className="mt-2 rounded-lg border border-zinc-900/10 shadow-lg ring-1 ring-black ring-opacity-5 dark:border-white/10">
          <div className="relative grid grid-cols-3 gap-2 rounded-lg bg-white p-4 dark:bg-zinc-800">
            <Select
              label="Sort by: "
              value={sortBy}
              onChange={handleSortBy}
              options={SORT_BY}
              selectContainerClassName="col-span-2"
            />

            <Select
              label="Order by: "
              value={orderBy}
              onChange={handleOrderBy}
              options={ORDER_BY}
              selectContainerClassName="col-span-2"
            />
          </div>
        </div>
      </Popover.Panel>
    </Popover>
  );
};

export default SortTask;
