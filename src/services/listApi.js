import {
  doc,
  collection,
  deleteDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  updateDoc,
  setDoc,
} from 'firebase/firestore';

import { auth, db } from './firebase';

class listApi {
  newDoc() {
    const userRef = doc(db, 'todo', auth?.currentUser?.uid ?? '');
    return doc(collection(userRef, 'lists'));
  }
  addList(listRef, newList) {
    return setDoc(listRef, {
      ...newList,
      createdAt: serverTimestamp(),
    });
  }
  updateList(updatedList) {
    const userRef = doc(db, 'todo', auth?.currentUser?.uid ?? '');
    const listDoc = doc(userRef, 'lists', updatedList.id);
    return updateDoc(listDoc, {
      name: updatedList.name,
      theme: updatedList.theme,
    });
  }
  deleteList(id) {
    const userRef = doc(db, 'todo', auth?.currentUser?.uid ?? '');
    const listDoc = doc(userRef, 'lists', id);
    return deleteDoc(listDoc);
  }
  getAllLists(uid) {
    const userRef = doc(db, 'todo', uid);
    const listCollectionRef = collection(userRef, 'lists');
    const q = query(listCollectionRef, orderBy('createdAt'));
    return getDocs(q);
  }
}

export default new listApi();
