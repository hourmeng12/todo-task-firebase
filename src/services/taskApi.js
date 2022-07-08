import {
  doc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  updateDoc,
  serverTimestamp,
  writeBatch,
  increment,
} from 'firebase/firestore';
import { auth, db } from '../app/firebase';

class taskApi {
  newDoc() {
    const userRef = doc(db, 'todo', auth?.currentUser?.uid ?? '');
    return doc(collection(userRef, 'tasks'));
  }
  addTask(taskRef, listId, newTask) {
    const userRef = doc(db, 'todo', auth?.currentUser?.uid ?? '');
    const listRef = doc(userRef, 'lists', listId);

    const batch = writeBatch(db);
    batch.update(listRef, {
      tasksCount: increment(1),
    });
    batch.set(taskRef, {
      listId,
      task: newTask,
      completed: false,
      createdAt: serverTimestamp(),
    });

    return batch.commit();
  }
  updateTask(updatedTask) {
    const userRef = doc(db, 'todo', auth?.currentUser?.uid ?? '');
    const taskRef = doc(userRef, 'tasks', updatedTask.id);
    return updateDoc(taskRef, {
      task: updatedTask.task,
    });
  }
  deleteTask(listId, taskId) {
    const userRef = doc(db, 'todo', auth?.currentUser?.uid ?? '');
    const listRef = doc(userRef, 'lists', listId);
    const taskRef = doc(userRef, 'tasks', taskId);

    const batch = writeBatch(db);
    batch.update(listRef, {
      tasksCount: increment(-1),
    });
    batch.delete(taskRef);
    return batch.commit();
  }
  toggleTask(listId, task) {
    const userRef = doc(db, 'todo', auth?.currentUser?.uid ?? '');
    const listRef = doc(userRef, 'lists', listId);
    const taskRef = doc(userRef, 'tasks', task.id);

    const batch = writeBatch(db);
    batch.update(listRef, {
      tasksCount: increment(task.completed ? 1 : -1),
    });
    batch.update(taskRef, {
      completed: !task.completed,
    });
    return batch.commit();
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
