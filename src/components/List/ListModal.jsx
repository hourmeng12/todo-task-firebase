import React, { useState } from 'react';
import Modal from '../UI/Modal';
import COLORS from '../../constant/colors';
import { useDispatch } from 'react-redux';
import { addList, updatedList } from '../../features/todo/listActions';
import Button from '../UI/Button';

const ListModal = ({
  isAdd,
  isEdit,
  isOpen,
  onClose,
  id,
  name = '',
  theme = COLORS[0],
}) => {
  const [enteredName, setEnteredName] = useState(name);
  const [selectedColor, setSelectedColor] = useState(theme);
  const dispatch = useDispatch();

  const changeColor = (event) => {
    setSelectedColor(event.target.value);
  };

  const handleCloseModal = () => {
    if (isAdd) {
      onClose();
      setEnteredName('');
      setSelectedColor(COLORS[0]);
    }
    if (isEdit) {
      onClose();
      setEnteredName(name);
      setSelectedColor(theme);
    }
  };

  const handleAddList = (event) => {
    event.preventDefault();

    if (enteredName.trim().length === 0 || !selectedColor) {
      return;
    }

    const newList = {
      name: enteredName,
      theme: selectedColor,
      tasksCount: 0,
    };

    if (isAdd) {
      dispatch(addList(newList));
      onClose();
      setEnteredName('');
      setSelectedColor(COLORS[0]);
    }

    if (isEdit) {
      dispatch(
        updatedList({
          id: id,
          ...newList,
        })
      );
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal}>
      <form onSubmit={handleAddList}>
        <div className="space-y-4">
          <div className="space-y-1">
            <label
              className="font-medium text-zinc-900 dark:text-zinc-200"
              htmlFor="name"
            >
              Name
            </label>
            <input
              required
              style={{
                borderColor: selectedColor,
              }}
              className="border-2 bg-transparent"
              value={enteredName}
              onChange={(e) => setEnteredName(e.target.value)}
              type="text"
              name="name"
              id="name"
            />
          </div>
          <div className="space-y-1">
            <p className="font-medium text-zinc-900 dark:text-zinc-200">
              Color
            </p>
            <div
              onChange={changeColor}
              className="flex flex-wrap justify-start space-x-2 space-y-2"
            >
              {COLORS.map((color, index) => (
                <ColorItem
                  key={index}
                  isSelected={selectedColor}
                  name="color"
                  id={index}
                  value={color}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-2">
          <Button
            type="button"
            onClick={handleCloseModal}
            className="px-4 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-700"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-teal-400 px-4 font-medium hover:bg-teal-500 dark:text-white"
          >
            {isAdd && 'Add'}
            {isEdit && 'Edit'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

const ColorItem = ({ isSelected, name, id, value }) => {
  return (
    <>
      <input
        className="hidden"
        type="radio"
        name={name}
        id={id}
        value={value}
      />
      <label
        style={{
          backgroundColor: value,
        }}
        className={`inline-flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-500 ${
          isSelected === value
            ? 'ring-2 ring-zinc-900/10 dark:ring-white/10'
            : ''
        }`}
        htmlFor={id}
      >
        <span
          className={
            isSelected === value
              ? 'h-3 w-3 rounded-full bg-zinc-900/80'
              : 'bg-transparent'
          }
        >
          &nbsp;
        </span>
      </label>
    </>
  );
};

export default ListModal;
