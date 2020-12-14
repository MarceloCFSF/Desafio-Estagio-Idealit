import firebase from 'firebase'
import { presentToast } from './utils/toast';

const config = {
  apiKey: "AIzaSyDdt39I7OLHJz3FDdKuXQy7SMp_rOSMyh4",
  authDomain: "desafio-estagio-idealit.firebaseapp.com",
  projectId: "desafio-estagio-idealit",
  storageBucket: "desafio-estagio-idealit.appspot.com",
  messagingSenderId: "241525551618",
  appId: "1:241525551618:web:fb5c9f0280e8b8deefad1b"
}

firebase.initializeApp(config)
export const data = firebase.database()
export const auth = firebase.auth()
export const currentUserID = auth.currentUser?.uid

export async function loginUser(username: string, password: string) {
  var email;
  const re = /\S+@+\S+\.\S+/
  re.test(username)
  ? email = username
  : email = `${username}@default.com`

  try {
    const res = await auth.signInWithEmailAndPassword(email, password)
    return auth.currentUser?.uid
  } catch {
    return false
  }
}

export async function registerUser(username: string, email: string, password: string) {
  try {
    await auth.createUserWithEmailAndPassword(email, password)
    await auth.signInWithEmailAndPassword(email, password)
    if (auth.currentUser) {
      await data.ref(`users/${auth.currentUser.uid}`).set({
        id: auth.currentUser.uid, username: username
      })
    }
    return true
  } catch (error) {
    presentToast(error.message)
    return false
  }
}

export async function deleteUser() {
  try {
    await auth.currentUser?.delete()
  } catch (error) {
    presentToast(error.message)
    return false
  }
}

export async function loginOutUser() {
  try {
    await auth.signOut()
  } catch {
    return false
  }
}