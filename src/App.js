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
import SubById from './SubById';
// import logo from './logo.svg';
// import Submissions from './Submissions.js';
// import Submission from './Submission.js'
// import Best from './Best.js'

class App extends Component {
  constructor() {
    super()
    this.url = "http://localhost:3010";
    this.state = {
      hello: "",
      submissions : [],
      submission : null,
      best : null
    };
    this.state.hello = "Hello"
  };

  componentDidMount() {
    this.showBest();
  };

  showBest(){
    this.setState({hello:"Hello"})
    fetch(this.url+"/submissions/best")
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      json.class="best"
      this.setState({
        best:json
      });
    })
    .catch((err) => {
      console.log(err);
    });
  };

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Route exact path="/" component={Home}/>
          <Route path="/about" component={About}/>
          <Route path="/gallery" component={Gallery}/>
          <Route path="/submissions/:id" component={SubById}/>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
