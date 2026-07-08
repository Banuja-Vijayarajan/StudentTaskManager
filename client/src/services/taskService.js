import { db } from "../firebaseConfig";

import {
    collection,
    addDoc
} from "firebase/firestore";

export async function addTask(task){

    return await addDoc(

        collection(db,"tasks"),

        task

    );

}