import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {

  return (

    <nav>
      <div className="nav-header">
      <Link to="/"  className="nav-home" >
        <div className="nav-home-link">          
            <strong className="nav-home-link-text">HOME</strong>          
        </div>
        </Link>
        <strong className="nav-title">TO DO APP</strong>
        <Link to="/addTodoTask" className="nav-home">
        <div className="nav-home-link" >
            <strong className="nav-home-link-text">+To Do</strong>
        </div>
        </Link>
      </div>

    </nav>
  );
}