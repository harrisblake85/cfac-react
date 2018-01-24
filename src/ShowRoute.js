import React from 'react';
import {Route} from 'react-router';

// import Submissions from './Submissions.js';
import SubById from './SubById.js';
class ShowRoute extends Route {

  render(){
    return(
      <SubById
        showSubmission = {this.props.showSubmission.bind(this)}
        />
    )
  }

}

export default ShowRoute;
