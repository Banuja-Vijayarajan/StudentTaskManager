import { db } from "../firebaseConfig";

import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    doc,
    updateDoc,
    deleteDoc
} from "firebase/firestore";

export async function addTask(task) {

    return await addDoc(

        collection(db, "tasks"),

        task

    );

}

export async function getTasks(userId) {

    const q = query(

        collection(db, "tasks"),

        where("userId", "==", userId)

    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({

        id: doc.id,

        ...doc.data()

    }));

}

export async function toggleTask(id, completed) {

    const taskRef = doc(db, "tasks", id);

    await updateDoc(taskRef, {
        completed: !completed
    });

}

export async function deleteTask(id){

    await deleteDoc(

        doc(db,"tasks",id)

    );

}