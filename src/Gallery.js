import React, {Component} from 'react';
import Submissions from './Submissions.js';

class Gallery extends Component {
  constructor(){
    super()
    this.state={ submissions: [] }
    this.url = "http://localhost:3010";
  };

  componentWillMount(){
    this.showGallery();
  };

  async showGallery() {
    try {
      const response    = await fetch(this.url+"/submissions");
      const submissions = await response.json();
                          await this.setState({submissions});
    } catch (e) {
      this.setState({submissions:[{title:"Not Found",key:"Not Found"}]});
    }
  };

  render(){
    return(

      <Submissions
        submissions = {this.state.submissions}
        />
    )
  };

};

export default Gallery;
