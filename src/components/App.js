import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { auth, getUserData, signInWithGoogle, updateUserImage, updateUserProfile, addNewClient, deleteClient, editClient, initWatchUserDb } from "./firebase";
import Login from './Login';
import Register from './Register';
import Reset from './Reset';
import Dashboard from './Dashboard';
import Clients from './Clients';
import Profile from './Profile';
import Header from './Header';
import AddClientForm from './AddClientForm';
import EditClientForm from './EditClientForm';
import SignUpCard from './SignUpCard';
import $ from 'jquery';

import '../App.css';


class App extends Component {

    state = {
        loggedIn: false,
        currentUser: false,
        clientList: []
    }

    componentDidMount() {

    }

    // handleUserSignIn =() => {
    //     console.log(auth);
    // }

    // handleUpdateUserState = (updateValue, callback) => {
    //     if(callback){
    //         callback();
    //     }
    //     this.setState({
    //         : updateValue
    //     })
    // }
    // function to update both the user firebase DB AND update currentUsers user image in state
    handleUserProfileImage = (dataID, url, callback) => {
        updateUserImage(dataID, url);
        this.setState(prevState => ({
            currentUser: { ...prevState.currentUser, userImage: url }
        }))
    }

    handleUserProfileUpdate = (dataID, newName) => {
        updateUserProfile(dataID, newName);
        this.setState(prevState => ({
            currentUser: { ...prevState.currentUser, name: newName }
        }))
    }

    handleAddNewClient = (dataID, clientData) => {
        addNewClient(dataID, clientData)
        this.setState(prevState => ({
            currentUser: { ...prevState.currentUser, clients: [...prevState.currentUser.clients, clientData] }
        }))
    }

    getUser = (user) => {
        this.handleCheckCurrentUser(user.uid)
    }

    handleCheckCurrentUser = () => {

        const currentUser = getUserData(auth.currentUser.uid);
        currentUser.then(data => {
            this.handleUpdateCurrentUser(data);
        })
    }

    handleClientList = (data) => {
        this.setState({
            clientList: data
        })
    }

    handleUpdateCurrentUser = async (userObj) => {
        this.setState({
            loggedIn: userObj != false ? true : false,
            currentUser: userObj,
            clientList: userObj.clients
        })
    }



    handleWatchUserClients = (dataID) => {
       const docData = initWatchUserDb(dataID);
       return docData;
    }


    handleDeleteClient = (dataID, clientId, storedClients) => {
        console.log('DELETING CLIENT: ', clientId);
        deleteClient(dataID, clientId, storedClients);
    }

    handleEditClient = (dataID, clientId, storedClients) => {
        console.log('Editing CLIENT: ', clientId);
        editClient(dataID, clientId, storedClients);
    }

    render() {
        // console.log(this.state, this.state.currentUser)
        return (
            <div id="appContainer">
                <Router>
                    <Header
                        userName={this.state.currentUser != undefined && this.state.currentUser.name ? this.state.currentUser.name : false}
                        isUser={this.state.loggedIn}
                        updateCurrentUser={this.handleUpdateCurrentUser}
                    />
                    <Routes>
                        <Route exact path="/" element={<Login
                            handleSetUser={this.handleUpdateCurrentUser}
                        />} />
                        <Route exact path="/register" element={<Register />} />
                        <Route exact path="/reset" element={<Reset />} />
                        <Route exact path="/dashboard" element={
                            <Dashboard
                                getUser={this.getUser}
                                updateCurrentUser={this.handleUpdateCurrentUser}
                            />
                        }>
                            <Route path="profile" element={
                                <Profile
                                    currentUser={this.state.currentUser}
                                    updateUserProfileImage={this.handleUserProfileImage}
                                    updateUserProfileInfo={this.handleUserProfileUpdate}
                                />} />
                            <Route path="clients" element={
                                <Clients
                                    currentUser={this.state.currentUser}
                                    dataID={this.state.currentUser.dataID}
                                    clientList={this.state.clientList}
                                    deleteClient={this.handleDeleteClient}
                                    editClient={this.handleEditClient}
                                />} />
                            <Route path="clients/addclientform" element={
                                <AddClientForm
                                    currentUser={this.state.currentUser}
                                    addNewClient={this.handleAddNewClient}
                                />} />
                            <Route path="clients/editclientform" element={
                                <EditClientForm
                                    currentUser={this.state.currentUser}
                                />} />
                        </Route>

                    </Routes>
                </Router>
                {/* <SignUpCard /> */}
            </div>
        )
    }
};
export default App;
