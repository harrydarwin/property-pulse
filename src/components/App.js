import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

    // updateCurrentUser = (userObj) => {
    //     this.setState({
    //         loggedIn: userObj != false ? true : false,
    //         currentUser: userObj
    //     })
    // }

   render() {

       return (
           <div id="appContainer">
            <Router>
                <Header />
                    <Routes>
                        <Route exact path="/" element={<Login />} />
                        <Route exact path="/register" element={<Register />} />
                        <Route exact path="/reset" element={<Reset />} />
                        <Route exact path="/dashboard" element={<Dashboard />} />

                    </Routes>
            </Router>
              {/* <SignUpCard /> */}
           </div>
       )
   }
};
export default App;
