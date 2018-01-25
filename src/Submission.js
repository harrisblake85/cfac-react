import React from 'react';

const Submission = (props) => {
  const submission = props.submission;
  const subclass = props.subclass;
  return(
    <div className={subclass}>
    <h1>{submission.title}</h1>
    <img alt={submission.title} src={submission.img}></img>
    <p>{submission.desc}</p>
    <h3>{submission.likes}</h3>
    </div>
  )
}

export default Submission;
