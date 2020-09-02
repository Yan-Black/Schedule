import * as React from 'react';
import { NavLink } from 'react-router-dom';

import './index.scss';

const NavBar: React.FC = () => {
  return (
    <div className="navbar">
      <NavLink exact className="navbar-item" to="/">
        Table
      </NavLink>
      <NavLink className="navbar-item" to="/calendar">
        Calendar
      </NavLink>
      <NavLink className="navbar-item" to="/list">
        List
      </NavLink>
    </div>
  );
};
export default NavBar;
