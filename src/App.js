import React, { Component } from 'react';
import {
  BrowserRouter,
  Route
} from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import Submissions from './Submissions.js';
import Submission from './Submission.js'
import Home from './Home.js';
import About from './About.js';
import Header from './Header.js';
import GalleryRoute from './GalleryRoute.js';
import ShowRoute from './ShowRoute.js';
// import Best from './Best.js'
import SubById from './SubById';

class App extends Component {
  constructor() {
    super()
    this.url = "http://localhost:3010";
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
    this.showHome();
    // this.showGallery();
    // this.showSubmission(this.state.submissions[0]);
  };

  showSubmission(id){
    console.log(id);
    fetch(this.url+"/submissions/"+id)
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      console.log(json);
      this.setState({
        submission:json
      })
    })
    .catch((err) => {
      console.log(err);
    })

  };

  showGallery() {
    // this.becomeNoState()

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
  hey(){
    console.log("hey");
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Route exact path="/" component={Home}/>
          <Route path="/about" component={About}/>
          <GalleryRoute showGallery={this.showGallery.bind(this)} path="/gallery" render={() => {
              return(
                <Submissions
                  submissions={this.state.submissions}
                  />
              )
          }}/>
        <Route showSubmission={this.showSubmission.bind(this)} path="/submissions/:id"
          id = {"5a6640d0b02e79f3fe95e393"}
          component={SubById}
            />

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
