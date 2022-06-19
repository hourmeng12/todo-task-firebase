import { writeBatch, doc } from 'firebase/firestore';
import { db, auth } from '../../services/firebase';

import { todoActions } from './todoSlice';
import listApi from '../../services/listApi';
import taskApi from '../../services/taskApi';

export const addList = (newList) => async (dispatch) => {
  try {
    const data = await listApi.addList(newList);
    const transformList = {
      id: data.id,
      ...newList,
      tasks: [],
    };

    dispatch(todoActions.addList(transformList));
  } catch (error) {
    dispatch(todoActions.setError(error.message));
  }
};

export const updatedList = (updatedList) => async (dispatch) => {
  try {
    dispatch(todoActions.updateList(updatedList));

    await listApi.updateList(updatedList);
  } catch (error) {
    console.log(error.message);
    dispatch(todoActions.setError(error.message));
  }
};

export const deleteList = (id) => async (dispatch) => {
  try {
    dispatch(todoActions.deleteList(id));

    const batch = writeBatch(db);
    const tasksData = await taskApi.getAllTasks(id);
    const userRef = doc(db, 'todo', auth?.currentUser?.uid);
    tasksData.forEach((task) => {
      const taskRef = doc(userRef, 'tasks', task.id);
      batch.delete(taskRef);
    });
    await batch.commit();
    await listApi.deleteList(id);
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllLists = () => async (dispatch) => {
  dispatch(todoActions.listLoading());
  try {
    const data = await listApi.getAllLists(auth.currentUser.uid);
    const lists = [];
    data.forEach((doc) => {
      const docData = doc.data();
      lists.push({
        id: doc.id,
        name: docData.name,
        theme: docData.theme,
        tasks: [],
      });
    });

    dispatch(todoActions.getAllLists(lists));
  } catch (error) {
    console.log(error.message);
  }
};
