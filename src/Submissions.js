import React from 'react';
import { NavLink } from 'react-router-dom';
import Submission from './Submission.js'

const Submissions = (props) => {
  console.log(props.submissions);

  let submissions = props.submissions || [];
  submissions = submissions.map((submission) => {
    return(
      <NavLink key={submission._id} to={"/submissions/"+submission._id}>
        <Submission
          subclass = "sub_gallery"
          submission = {submission}
          />
      </NavLink>


    )
  });

  return (submissions)
}

export default Submissions
