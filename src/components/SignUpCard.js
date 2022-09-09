
// import { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './Login';


function SignUpCard() {
        return (
            <div className="container h-100 d-flex justify-content-center align-items-center">
                <div className="container card-container sign-up-card">
                    <Router>
                        <Routes>
                            <Route exact path="/" element={<Login />} />
                        </Routes>
                    </Router>
                </div>
            </div>
        )
}
export default SignUpCard;

