import React from 'react';
import Submission from './Submission.js'
const Submissions = (props) => {
  console.log(props.submissions);
  let submissions = props.submissions;
  submissions = submissions.map((submission) => {
    submission.show= false;
    submission.class="sub-dex"
    return(
      <Submission
        key = {submission.id}
        showSubmission = {props.showSubmission.bind(this)}
        submission = {submission}
        />
    )
  });

  return submissions
}

export default Submissions
