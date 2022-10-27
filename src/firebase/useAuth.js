/* eslint-disable import/prefer-default-export */
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile,
} from 'firebase/auth';
import auth from './firebaseConfig';

const register = async (name, email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(auth.currentUser, { displayName: name });
  return userCredential;
};

const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);
const loginUser = (email, password) => signInWithEmailAndPassword(auth, email, password);
const logoutUser = () => signOut(auth);
const updateName = (name) => updateProfile(auth.currentUser, { displayName: name });

export {
  createUser, loginUser, logoutUser, updateName, register,
};
