import React from 'react';
import { NavLink} from 'react-router-dom';

const Header = () => (
  <header>
    <ul className="main-nav">
      <li><NavLink exact to="/" className="viable">Home</NavLink></li>
      <li><NavLink to="/about" className="viable">About</NavLink></li>
      <li><NavLink to="/gallery" className="viable">Gallery</NavLink></li>
      <li><NavLink to="/user" className="viable">User</NavLink></li>
      <li><NavLink to="/cart" className="viable">Cart</NavLink></li>
      <li><NavLink to="/new"  className="viable">New Submission</NavLink></li>
    </ul>
  </header>
);

export default Header;
// /page/1/likes/-1
