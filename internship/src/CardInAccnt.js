import React from "react";
import "./CardInAccnt.css";

function CardInAccnt(props) {
  return (
    <div className="cardInAccnt">
      <h3>{props.title}</h3>
      <button>View</button>
    </div>
  );
}

export default CardInAccnt;
