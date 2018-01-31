import React from 'react';

const CartButton = (props) => {
  let text = "Add This Submission To Your Cart!";
  let classy = "";
  if (props.inCart) {
    text   = "Submission Already In Your  Cart!";
    classy="red";
  }

  return(

    <button
      className={classy}
      onClick={
        () => {
          props.cartSubmission(props.submission._id)
        }

      }>{text}</button>

    )
  }












  export default CartButton;
