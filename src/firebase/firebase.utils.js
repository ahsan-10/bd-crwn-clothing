import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCiLSvkGyx4bhRY-Lr-1q_835bvvQV5KGc",
    authDomain: "bd-crwn-db.firebaseapp.com",
    projectId: "bd-crwn-db",
    storageBucket: "bd-crwn-db.appspot.com",
    messagingSenderId: "527832081736",
    appId: "1:527832081736:web:bbb8e2f23379ba7429ff7d",
    measurementId: "G-NT3XFRVYMY"
  };

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;