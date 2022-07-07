import { todoActions } from './todoSlice';
import taskApi from '../../services/taskApi';

export const addTask = (listId, task) => async (dispatch) => {
  try {
    const taskRef = taskApi.newDoc();
    const transformTask = {
      id: taskRef.id,
      task,
      completed: false,
    };
    dispatch(todoActions.addTask({ listId, task: transformTask }));

    await taskApi.addTask(taskRef, listId, task);
  } catch (error) {
    dispatch(todoActions.setError(error.message));
  }
};

export const updateTask = (listId, task) => async (dispatch) => {
  try {
    dispatch(todoActions.updateTask({ listId, task }));

    await taskApi.updateTask(task);
  } catch (error) {
    dispatch(todoActions.setError(error.message));
  }
};

export const deleteTask = (listId, taskId) => async (dispatch) => {
  try {
    dispatch(todoActions.deleteTask({ listId, taskId }));

    await taskApi.deleteTask(taskId);
  } catch (error) {
    dispatch(todoActions.setError(error.message));
  }
};

export const toggleTask = (listId, task) => async (dispatch) => {
  try {
    dispatch(todoActions.toggleTask({ listId, task }));

    await taskApi.toggleTask(task);
  } catch (error) {
    dispatch(todoActions.setError(error.message));
  }
};

export const getAllTasks = (listId) => async (dispatch) => {
  dispatch(todoActions.taskLoading());
  try {
    const data = await taskApi.getAllTasks(listId);
    const tasks = [];
    data.forEach((doc) => {
      const docData = doc.data();
      tasks.push({
        id: doc.id,
        task: docData.task,
        completed: docData.completed,
      });
    });

    dispatch(todoActions.getAllTasks({ listId, tasks }));
  } catch (error) {}
};

export const getAllTasksBy = (listId, taskQuery) => async (dispatch) => {
  try {
    const data = await taskApi.getAllTasksBy(listId, taskQuery);
    const tasks = [];
    data.forEach((doc) => {
      const docData = doc.data();
      tasks.push({
        id: doc.id,
        task: docData.task,
        completed: docData.completed,
      });
    });

    dispatch(todoActions.getAllTasksBy({ listId, tasks }));
  } catch (error) {}
};
