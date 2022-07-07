import {
  doc,
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
  orderBy,
  updateDoc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { auth, db } from './firebase';

class taskApi {
  newDoc() {
    const userRef = doc(db, 'todo', auth?.currentUser?.uid ?? '');
    return doc(collection(userRef, 'tasks'));
  }
  addTask(taskRef, listId, newTask) {
    return setDoc(taskRef, {
      listId,
      task: newTask,
      completed: false,
      createdAt: serverTimestamp(),
    });
  }
  updateTask(updatedTask) {
    const userRef = doc(db, 'todo', auth?.currentUser?.uid ?? '');
    const taskRef = doc(userRef, 'tasks', updatedTask.id);
    return updateDoc(taskRef, {
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
  getAllTasksBy(listId, taskQuery) {
    const userRef = doc(db, 'todo', auth.currentUser.uid);
    const taskCollectionRef = collection(userRef, 'tasks');
    const q = query(
      taskCollectionRef,
      where('listId', '==', listId),
      orderBy(taskQuery.fieldPath, taskQuery.direction)
    );
    return getDocs(q);
  }
}

export default new taskApi();
