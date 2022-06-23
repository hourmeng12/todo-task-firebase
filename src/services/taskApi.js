import {
  doc,
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  orderBy,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db } from './firebase';

class taskApi {
  addTask(listId, newTask) {
    const userRef = doc(db, 'todo', auth?.currentUser?.uid ?? '');
    const taskCollectionRef = collection(userRef, 'tasks');
    return addDoc(taskCollectionRef, {
      listId,
      task: newTask,
      completed: false,
      createdAt: serverTimestamp(),
    });
  }
  updateTask(updatedTask) {
    const userRef = doc(db, 'todo', auth?.currentUser?.uid ?? '');
    const taskDoc = doc(userRef, 'tasks', updatedTask.id);
    return updateDoc(taskDoc, {
      task: updatedTask.task,
    });
  }
  deleteTask(id) {
    const userRef = doc(db, 'todo', auth?.currentUser?.uid ?? '');
    const taskDoc = doc(userRef, 'tasks', id);
    return deleteDoc(taskDoc);
  }
  toggleTask(task) {
    const userRef = doc(db, 'todo', auth?.currentUser?.uid ?? '');
    const taskDoc = doc(userRef, 'tasks', task.id);
    return updateDoc(taskDoc, {
      completed: !task.completed,
    });
  }
  getAllTasks(listId) {
    const userRef = doc(db, 'todo', auth.currentUser.uid);
    const taskCollectionRef = collection(userRef, 'tasks');
    const q = query(
      taskCollectionRef,
      where('listId', '==', listId),
      orderBy('createdAt', 'desc')
    );
    return getDocs(q);
  }
}

export default new taskApi();
