import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, Outlet } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, userDB, logout } from "./firebase";
import { query, collection, getDocs, where, onSnapshot } from "firebase/firestore";
import Sidebar from "./Sidebar";


function Dashboard({getUser, updateCurrentUser, userData}) {

  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [clientList, setClientList] = useState([]);
  const [currentUser, setCurrentUser] = useState(userData);

  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, userDB), where("uid", "==", user.uid));
      const doc = getDocs(q);
      doc.then(docs => {
          const data = docs.docs[0].data();
          setName(data.name);
          window.localStorage.setItem('pp47userAccessToken', data.dataID);
      })
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  // useEffect( () => {
  //   setCurrentUser(userData);
  // },[userData])

  // useEffect(()=> {

  // },[clientList])

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    getUser(user);
    fetchUserName();

    const userDbRef = collection(db, userDB);
    const unsubscribe = onSnapshot(userDbRef, snapshot => {
      snapshot.docs.forEach((doc) => {
        if(doc.data().uid == user.uid){
          const newData = doc.data();
          setClientList(newData.clients);
          updateCurrentUser(newData);
          console.log("WE UPDATED TO THIS: ", newData.clients)
        }
      })
    })
    return () => {
      console.log('stop watch')
      unsubscribe();
    }
  }, [user, loading]);

   // Set up realtime updates for users clients list
//

  return (
    <div className="dashboard container">
        <aside>
          <Sidebar />
        </aside>
        <div className="dashboard-content-container flex-grow-1">
          <Outlet />
        </div>

       {/* <div className="dashboard__container">
        Logged in as
         <div>{name}</div>
         <div>{user?.email}</div>
         <button className="dashboard__btn" onClick={() => logout(updateCurrentUser(false))}>
          Logout
         </button>
       </div> */}
     </div>
  );
}
export default Dashboard;