import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, userDB, logout } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";


function Dashboard({getUser, updateCurrentUser}) {

  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, userDB), where("uid", "==", user.uid));
      const doc = getDocs(q);
      doc.then(docs => {
          const data = docs.docs[0].data();
          setName(data.name);
      })
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    getUser(user);
    fetchUserName();
  }, [user, loading]);
  return (
    <div className="dashboard">



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