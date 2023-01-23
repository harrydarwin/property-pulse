import { initializeApp } from "firebase/app";
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
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
  onSnapshot,
  arrayUnion
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
const userDB = 'propertyPulseUsersDb47';

// REALTIME UPDATES - to from userDB to currentUser state - MAY NOT NEED
const initWatchUserDb = (dataID) => {
  const toUpdate = onSnapshot(doc(db, userDB, dataID), (doc) => {
    console.log("Current data: ", doc.data());
    return doc.data();
  })
}

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

const getUserData = async (userUuid = null) => {
  if(!window.localStorage.getItem('pp-47-ui')){
    window.localStorage.setItem('pp-47-ui', userUuid);
  }

  if(!userUuid){
    userUuid = window.localStorage.getItem('pp-47-ui')
  }
  console.log('USER MAWWWWFUCKING ID MY G:: ', userUuid);
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

// add new client to users firebase clients list
const addNewClient = async (dataID, clientData, toAdd = true, storedClients) => {
  let clientList;

  const userRef = doc(db, userDB, dataID);
  await updateDoc(userRef, {
    clients: !toAdd ? storedClients.filter(client => client.uid !== clientData) : arrayUnion(clientData)
  });
}

// Delete client
const deleteClient = async (dataID, clientID, storedClients) => {
  const newClientList = storedClients.filter(client => client.uid !== clientID);
  const userRef = doc(db, userDB, dataID);
  await updateDoc(userRef, {
    clients: newClientList
  });
}

const getQueryId = (q, clientID) => {
  console.log(q.created_at.seconds);
  console.log(q.queryType + '-' + clientID + '-' + q.created_at.seconds)
  return q.queryType + '-' + clientID + '-' + q.created_at.seconds;
}

// Delete client
const deleteClientQuery = async (dataID, clientID, storedClients, queryID) => {
  let clientToEdit = storedClients.filter(client => client.uid == clientID);
  console.log('client: ', clientToEdit)

  const editedClientQueries = clientToEdit[0].queries.filter(q => getQueryId(q, clientID) !== queryID);
  console.log('Query: ', editedClientQueries)
  clientToEdit[0].queries = editedClientQueries;

  console.log(clientToEdit[0], editedClientQueries, queryID);
  editClient(dataID, clientToEdit[0], storedClients);

}

// Delete client
const editClient = async (dataID, clientData, storedClients) => {
 const newClientList = storedClients.map(c => c.uid == clientData.uid ? c = clientData : c);
  const userRef = doc(db, userDB, dataID);
  console.log(storedClients, newClientList)
  await updateDoc(userRef, {
    clients: newClientList
  });
}


const resetUser = async (uid, previousAttempts ) => {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
  score: 0,
  displayName: "false",
  attemptsFailed: previousAttempts + 1
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
    addNewClient,
    userDB,
    getUserData,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
    initWatchUserDb,
    deleteClient,
    editClient,
    deleteClientQuery
  };