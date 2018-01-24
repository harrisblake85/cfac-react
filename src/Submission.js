import React from 'react';

const Submission = (props, {match}) => {
  const submission = props.submission;
  return(
    <div
      className = 'submission'
     >
    <h1>{submission.title}</h1>
    <img alt={submission.title} src={submission.img}></img>
    <p>{submission.desc}</p>
    <h3>{submission.likes}</h3>
    </div>
  )
}

export default Submission;
