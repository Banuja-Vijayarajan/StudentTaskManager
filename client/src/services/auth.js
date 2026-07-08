import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

export async function registerUser(email, password) {
  return await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
}