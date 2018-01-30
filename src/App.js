import React, { Component } from 'react';
import {
  BrowserRouter,
  Route, Redirect
} from 'react-router-dom';
import './App.css';
import Home from './Home.js';
import About from './About.js';
import Header from './Header.js';
import Gallery from './Gallery.js';
import SubById from './SubById.js';
import Auth from './Auth.js';
import NewSubmission from './NewSubmission.js';

class App extends Component {


  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Route exact path="/" component={Home}/>
          <Route path="/about" component={About}/>
          <Route path="/gallery/:page/:sort/:asc" component={Gallery}/>
          <Route exact path="/gallery"
                     render={ () => <Redirect to={"/gallery/1/likes/-1"} /> } />
          <Route path="/user" component={Auth}/>
          <Route path="/submissions/:id" component={SubById}/>
          <Route path="/new" component={NewSubmission}/>

        </div>
      </BrowserRouter>
    );
  };
};

export default App;
