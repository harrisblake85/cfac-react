import React, {Component} from 'react';
// import Submissions from './Submissions.js';
class Gallery extends Component {

  componentDidMount(){
    this.props.showGallery();

  }
  render(){
    return(
      <div className="Gallery"></div>
    )

    }

}

export default Gallery;
