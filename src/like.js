import React from 'react';

const Like = (props) => {
  let text = "Like This Submission!";
  let classy = "";
  if (props.liked) {
      text = "You've Already Liked!";
      classy="red";
  }

    return(

      <button
        className={classy}
        onClick={
          () => {
            props.likeSubmission(props.submission._id)
          }

        }>{text}</button>

    )
}












export default Like;
