import React from "react";
import { Link } from "react-router-dom";


// navigation links
export default function Nav( {instance} ) {

  return (
    <nav>
      {/* icon */}
      <div id="icon">
        <img src="img/icon.png" alt="Icon" />
      </div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/volcano-list">Volcano List</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li id="login">
          <p>
            Logged in as: {instance.email}
          </p>
        </li>
      </ul>
    </nav>
  );
}
