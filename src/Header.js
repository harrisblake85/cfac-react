import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from './logo.svg';
const Header = () => (
  <header>
    <span className="icn-logo"><i className="material-icons"><img alt="" src={logo}></img></i></span>
    <ul className="main-nav">
      <li><NavLink exact to="/">Home</NavLink></li>
      <li><NavLink to="/about">About</NavLink></li>
      <li><NavLink to="/gallery">Gallery</NavLink></li>
      <li><NavLink to="/login">Login</NavLink></li>
      <li><NavLink to="/cart">Cart</NavLink></li>
    </ul>
  </header>
);

export default Header;
