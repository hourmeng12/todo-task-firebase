import { createSlice } from '@reduxjs/toolkit';
import { logout } from '../user/userSlice';

const initialState = {
  listLoading: null,
  taskLoading: false,
  lists: [],
  error: null,
};

const todoSlice = createSlice({
  name: 'todo',
  initialState: initialState,
  reducers: {
    listLoading(state) {
      state.listLoading = true;
    },
    taskLoading(state) {
      state.taskLoading = true;
    },
    // list reducer
    addList(state, action) {
      state.lists.push(action.payload);
    },
    updateList(state, action) {
      const updatedList = action.payload;
      const existingList = state.lists.find(
        (list) => list.id === updatedList.id
      );
      existingList.name = updatedList.name;
      existingList.theme = updatedList.theme;
    },
    deleteList(state, action) {
      const id = action.payload;
      state.lists = state.lists.filter((list) => list.id !== id);
    },
    getAllLists(state, action) {
      if (state.listLoading) {
        state.listLoading = false;
        const lists = action.payload;
        state.lists.push(...lists);
      }
    },
    // task reducer
    addTask(state, action) {
      const { listId, task } = action.payload;
      const existingList = state.lists.find((list) => list.id === listId);
      existingList.tasksCount++;
      existingList.tasks.unshift(task);
    },
    updateTask(state, action) {
      const { listId, task } = action.payload;
      const existingList = state.lists.find((list) => list.id === listId);
      const existingTask = existingList.tasks.find(
        (_task) => _task.id === task.id
      );
      existingTask.task = task.task;
    },
    deleteTask(state, action) {
      const { listId, taskId } = action.payload;
      const existingList = state.lists.find((list) => list.id === listId);
      existingList.tasksCount--;
      existingList.tasks = existingList.tasks.filter(
        (task) => task.id !== taskId
      );
    },
    toggleTask(state, action) {
      const { listId, task } = action.payload;
      const existingList = state.lists.find((list) => list.id === listId);
      existingList.tasksCount += task.completed ? 1 : -1;
      const existingTask = existingList.tasks.find(
        (_task) => _task.id === task.id
      );
      existingTask.completed = !task.completed;
    },
    getAllTasks(state, action) {
      if (state.taskLoading) {
        state.taskLoading = false;
        const { listId, tasks } = action.payload;
        const existingList = state.lists.find((list) => list.id === listId);
        if (existingList) {
          existingList.tasks.length = 0;
          existingList.tasks.push(...tasks);
        }
      }
    },
    getAllTasksBy(state, action) {
      const { listId, tasks } = action.payload;
      const existingList = state.lists.find((list) => list.id === listId);
      existingList.tasks.length = 0;
      existingList.tasks.push(...tasks);
    },
    // error
    setError(state, action) {
      state.taskLoading = false;
      state.listLoading = false;
      state.error = action.payload;
    },
  },
  extraReducers: {
    [logout]: (state) => {
      state.lists.length = 0;
      state.lists.push(
        {
          id: 'inbox',
          name: 'Inbox',
          tasks: [],
          theme: '#06B6D4',
        },
        {
          id: 'important',
          name: 'Important',
          tasks: [],
          theme: '#F97316',
        },
        {
          id: 'tasks',
          name: 'Tasks',
          tasks: [],
          theme: '#8B5CF6',
        }
      );
      console.log('push list');
    },
  },
});

export const todoActions = todoSlice.actions;

// selector
export const selectLists = (state) => state.todo.lists;
export const selectListLoading = (state) => state.todo.listLoading;
export const selectTaskLoading = (state) => state.todo.taskLoading;
export const selectListError = (state) => state.todo.error;

export default todoSlice.reducer;
