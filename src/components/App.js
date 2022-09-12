import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { auth, getUserData, signInWithGoogle } from "./firebase";
import Login from './Login';
import Register from './Register';
import Reset from './Reset';
import Dashboard from './Dashboard';
import $ from 'jquery';
import SignUpCard from './SignUpCard';

import '../App.css';
import Header from './Header';


class App extends Component {

    state = {
        loggedIn: false,
        currentUser: false,
    }

    // componentDidMount() {


    // }

    // handleUserSignIn =() => {
    //     console.log(auth);
    // }

    getUser = (user) => {
        console.log(user, user.uid)
        this.handleCheckCurrentUser(user.uid)
    }

    handleCheckCurrentUser = () => {

            const currentUser = getUserData(auth.currentUser.uid);
            currentUser.then(data => {
                this.handleUpdateCurrentUser(data);
            })
    }

    handleUpdateCurrentUser = (userObj) => {
        console.log(userObj);
        this.setState({
            loggedIn: userObj != false ? true : false,
            currentUser: userObj
        })
    }



   render() {
console.log()
       return (
           <div id="appContainer">
            <Router>
                <Header
                    userName={this.state.currentUser.name ? this.state.currentUser.name : false}
                    isUser={this.state.loggedIn}
                    updateCurrentUser={this.handleUpdateCurrentUser}
                />
                    <Routes>
                        <Route exact path="/" element={<Login
                            handleSetUser={this.handleUpdateCurrentUser}
                        />} />
                        <Route exact path="/register" element={<Register />} />
                        <Route exact path="/reset" element={<Reset />} />
                        <Route exact path="/dashboard" element={<Dashboard
                            getUser={this.getUser}
                            updateCurrentUser={this.handleUpdateCurrentUser}
                        />} />

                    </Routes>
            </Router>
              {/* <SignUpCard /> */}
           </div>
       )
   }
};
export default App;
