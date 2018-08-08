import React from 'react';

const Button = props => (
  <button className={`btn ${props.btnClass}`}  onClick={props.handleClick}>
  {props.needsIcon ? <i data-vote={props.btnVote} className={`fa fa-check`} aria-hidden="true"></i> : props.children}
</button>
)

export default Button;