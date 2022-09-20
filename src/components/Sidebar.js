import "./Sidebar.css";
import React from 'react'
import { Routes, Route, Link, Outlet } from "react-router-dom";

export default function Sidebar() {
  return (
    <nav className="sidebar mt-5">
        <ul className="sidebar-menu">
            <li className="sidebar-item"><Link to="profile">Profile</Link></li>
            <li className="sidebar-item"><Link to="clients">Clients</Link></li>
        </ul>
    </nav>


  )
}
