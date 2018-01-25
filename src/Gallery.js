import React, {Component} from 'react';
import Submissions from './Submissions.js';
class Gallery extends Component {
  constructor(props){
    super(props)
    this.state={
      submissions: []
    }
    this.url = "http://localhost:3010";
  }

  componentWillMount(){
    this.showGallery();

  }

  showGallery() {
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

  render(){
    return(
      <Submissions
      submissions = {this.state.submissions}
      />
    )
  }

}

export default Gallery;
