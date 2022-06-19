import {
  DotsVerticalIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import React, { useState } from 'react';
import DropDownMenu from '../UI/DropDownMenu';
import DeleteTaskModal from './DeleteTaskModal';
import EditTaskModal from './EditTaskModal';

const TaskOption = ({ id, name, theme }) => {
  const [isDelete, setIsDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const openDeleteModal = () => {
    setIsDelete(true);
  };

  const closeDeleteModal = () => {
    setIsDelete(false);
  };

  const openEditModal = () => {
    setIsEdit(true);
  };
  const closeEditModal = () => {
    setIsEdit(false);
  };

  return (
    <>
      <DropDownMenu
        buttonClassName="p-1 bg-transparent hover:bg-zinc-200 dark:hover:bg-zinc-700"
        items={[
          {
            text: 'Edit',
            icon: <PencilIcon className="mr-2 h-5 w-5" />,
            onClick: openEditModal,
          },
          {
            text: 'Delete',
            icon: <TrashIcon className="mr-2 h-5 w-5" />,
            onClick: openDeleteModal,
          },
        ]}
      >
        <DotsVerticalIcon className="h-4 w-4" />
      </DropDownMenu>
      <EditTaskModal
        id={id}
        task={name}
        theme={theme}
        isOpen={isEdit}
        onClose={closeEditModal}
      />
      <DeleteTaskModal
        id={id}
        task={name}
        isOpen={isDelete}
        onClose={closeDeleteModal}
      />
    </>
  );
};

export default TaskOption;
