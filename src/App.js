import React, { Component } from 'react';
import {
  BrowserRouter,
  Route
} from 'react-router-dom';
import './App.css';
import Home from './Home.js';
import About from './About.js';
import Header from './Header.js';
import Gallery from './Gallery.js';
import SubById from './SubById.js';
import Auth from './Auth.js';

class App extends Component {


  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Route exact path="/" component={Home}/>
          <Route path="/about" component={About}/>
          <Route path="/gallery" component={Gallery}/>
          <Route path="/user" component={Auth}/>
          <Route path="/submissions/:id" component={SubById}/>

        </div>
      </BrowserRouter>
    );
  };
};

export default App;
