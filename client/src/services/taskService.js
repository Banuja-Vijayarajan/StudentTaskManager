import { db } from "../firebaseConfig";

import {
  collection,
  addDoc,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot
} from "firebase/firestore";

export async function addTask(task) {
  return await addDoc(collection(db, "tasks"), task);
}

export function subscribeToTasks(userId, callback) {

  const q = query(
    collection(db, "tasks"),
    where("userId", "==", userId)
  );

  return onSnapshot(q, (snapshot) => {

    const tasks = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    callback(tasks);

  });

}

export async function toggleTask(id, completed) {

  await updateDoc(doc(db, "tasks", id), {
    completed: !completed
  });

}

export async function deleteTask(id) {

  await deleteDoc(doc(db, "tasks", id));

}

export async function editTask(id, updatedTask) {

  await updateDoc(doc(db, "tasks", id), updatedTask);

}