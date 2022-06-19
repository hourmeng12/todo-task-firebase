import {
  DotsVerticalIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import React, { useState } from 'react';
import DropDownMenu from '../UI/DropDownMenu';
import DeleteListModal from './DeleteListModal';
import ListModal from './ListModal';

const ListOption = ({ id, name, theme, buttonClassName }) => {
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
        buttonClassName={`h-full p-1 hover:bg-zinc-900/10 dark:hover:bg-white/10 ${
          buttonClassName ? buttonClassName : ''
        }`}
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
        <span className="inline-block items-center">
          <DotsVerticalIcon className="h-4 w-4 text-zinc-700 dark:text-zinc-200" />
        </span>
      </DropDownMenu>
      <ListModal
        isEdit
        isOpen={isEdit}
        onClose={closeEditModal}
        id={id}
        name={name}
        theme={theme}
      />
      <DeleteListModal
        id={id}
        name={name}
        isOpen={isDelete}
        onClose={closeDeleteModal}
      />
    </>
  );
};

export default ListOption;
