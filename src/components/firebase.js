import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  doc,
  updateDoc,
  onSnapshot
} from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDd1KTHQL3TNA256ypD2sk8_sZiXg68xec",
  authDomain: "propertypulse.firebaseapp.com",
  databaseURL: "https://propertypulse-default-rtdb.firebaseio.com",
  projectId: "propertypulse",
  storageBucket: "propertypulse.appspot.com",
  messagingSenderId: "564546231816",
  appId: "1:564546231816:web:553dc001868ca66d72fbbd"
};

// init firebase app + services
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();
const userDB = process.env.REACT_APP_USERS_DB;

// REALTIME UPDATES - to from userDB to currentUser state - MAY NOT NEED
// const initWatchUserDb = (dataID) => {
//   const toUpdate = onSnapshot(doc(db, userDB, dataID), (doc) => {
//     console.log("Current data: ", doc.data());
//   })
// }

// sign IN with google function
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async (fn) => {
    let userObj = false;
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, userDB), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    console.log(docs, docs.docs)
    if (docs.docs.length === 0) {
        console.log('NO OCS')
      const docRef = await addDoc(collection(db, userDB), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        userImage: null,
        dataID: null,
        clients: []
      });
      // Set the data id so we can use it to access this users firebase database
      await updateDoc(docRef, {
        dataID: docRef.id
      });
      // WHEN NEW USER IS MADE - DASHBOARD IS LOOKING FOR USER DOCS - NEED TO set up loading plus get data from firebase or just set user state with this functtion? ----  make function in app.js to set user state to the user info above - fake it till next load????
      const q = query(collection(db, userDB), where("uid", "==", user.uid));
      const docs = await getDocs(q);
      userObj = docs.docs[0].data();

    } else {
        userObj = docs.docs[0].data();
    }
    if(fn){
        fn(userObj);
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const getUserData = async (userUuid) => {
    const q = query(collection(db, userDB), where("uid", "==", userUuid));
    const docs = await getDocs(q);
    if(docs.docs.length > 0) {
        return docs.docs[0].data();
    } else {
        console.log('Error no - user docs');
    }

}


const updateUserImage = async (dataID, url) => {
  const userRef = doc(db, userDB, dataID);
  await updateDoc(userRef, {
    userImage: url
  });

}

// updates user profile info in DB - ADD ANY MORE PROFILE INPUTS HERE OR CHANGEABLE DATA
const updateUserProfile = async (dataID, name) => {
  const userRef = doc(db, userDB, dataID);
  await updateDoc(userRef, {
    name: name,
    // email: email
  });

}

// sign IN with email + password
const logInWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
};

//   Register with email + password
const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      const docRef = await addDoc(collection(db, userDB), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
        userImage: null,
        dataID: null,
        clients: []
      });
      // Set the data id so we can use it to access this users firebase database
      await updateDoc(docRef, {
        dataID: docRef.id
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
};

//   Send password reset link to email address
const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
};

// Logout function
const logout = (fn) => {
    signOut(auth);
    if(fn){
        fn();
    }

};


export {
    auth,
    db,
    storage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
    updateUserImage,
    updateUserProfile,
    userDB,
    getUserData,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
  };