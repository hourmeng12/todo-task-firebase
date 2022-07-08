const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

exports.createDefaultLists = functions.auth.user().onCreate((user) => {
  const userRef = db.collection('todo').doc(user.uid);
  const listRef = userRef.collection('lists');
  const batch = db.batch();
  const inboxListRef = listRef.doc('inbox');
  batch.set(inboxListRef, {
    name: 'Inbox',
    tasksCount: 0,
    theme: '#06B6D4',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  const importantListRef = listRef.doc('important');
  batch.set(importantListRef, {
    name: 'Important',
    tasksCount: 0,
    theme: '#F97316',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  const tasksListRef = listRef.doc('tasks');
  batch.set(tasksListRef, {
    name: 'Tasks',
    tasksCount: 0,
    theme: '#8B5CF6',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  return batch.commit();
});

exports.deleteTodoLists = functions.auth.user().onDelete((user) => {
  const userRef = db.collection('todo').doc(user.uid);
  return userRef.delete();
});
