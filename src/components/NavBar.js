import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <div className="nav-bar">
      <NavLink
        to="/"
        exact
        activeStyle = {{
          background: "rgb(186, 197, 206)"
        }}
      >
        Home
      </NavLink>
      <NavLink
        to={`/users/${window.sessionStorage.getItem("currentUserId")}`}
        exact
        activeStyle = {{
          background: "rgb(186, 197, 206)"
        }}
      >
        My Posts
      </NavLink>
      <NavLink
        to="/logout"
        exact
      >
        Logout
      </NavLink>
    </div>
  )
}

export default NavBar