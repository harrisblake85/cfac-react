import React from 'react';

const Best = (props) => {
  const best = props.best;
  return (
    <div key={best.title} onClick ={() => {
      return props.showSubmission(best)
    }}>
    <h1>{best.title}</h1>
    <img alt={best.title} src={best.img}></img>
    </div>
  )
};

export default Best;
