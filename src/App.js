import React, { Component } from 'react';
import {
  BrowserRouter,
  Route
} from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
// import Submissions from './Submissions.js';
// import Submission from './Submission.js'
import Home from './Home.js'
import About from './About.js'
// import Best from './Best.js'

class App extends Component {
  constructor() {
    super()
    this.url = "http://localhost:3000";
    this.nostate = {
      hello: "",
      submissions : [],
      submission : null,
      best : null
    };
    this.state = JSON.parse(JSON.stringify(this.nostate));
    this.state.hello = "Hello"
  };
  becomeNoState(){
    this.setState(JSON.parse(JSON.stringify(this.nostate)));
  }
  showHome(){
    this.becomeNoState()
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

  componentDidMount() {
    this.showHome()
  };

  showSubmission(submission){
    console.log(submission);
    this.becomeNoState()
    this.setState({
      submission
    })
  };

  showGallery() {
    this.becomeNoState()
    fetch(this.url+"/submissions")
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      this.setState({
        submissions:json
      });
    })
    .catch((err) => {
      console.log(err);
    });
  };

  render() {
    return (
      <BrowserRouter>
      <div className="Container">
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
