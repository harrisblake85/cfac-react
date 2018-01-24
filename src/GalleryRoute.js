import {Route} from 'react-router';
// import Submissions from './Submissions.js';
class GalleryRoute extends Route {

  componentDidMount(){
    this.props.showGallery();

  }

}

export default GalleryRoute;
