import React, {Component} from 'react';
import Submissions from './Submissions.js';
import config from './config';

class Gallery extends Component {
  constructor(){
    super()
    this.state={
      submissions: [],
      page : "1",
      sort : "likes",
      asc  : "-1"
    }
  };

  componentWillMount(){
    this.showGallery();
  };

  async showGallery() {
    try {
      const response    = await fetch(config.url+"/submissions/page/"+this.state.page+"/"+this.state.sort+"/"+this.state.asc);
      const submissions = await response.json();
      await this.setState({submissions});
    } catch (e) {
      this.setState({submissions:[{title:"Not Found",key:"Not Found"}]});
    }
  };

  render(){
    return(
      <div className="gallery">
      <Submissions
        submissions = {this.state.submissions}
        />
      </div>
    )
  };

};

export default Gallery;
