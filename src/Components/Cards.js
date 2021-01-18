import React from "react";
import "./style.css";
function Cards(Props) {
  return (
    <div className="Card" id={Props.id}>
      <h1>{Props.name}</h1>
      <p>
        Total:
        {" " + Props.value}
      </p>
      {Props.value2 !== undefined ? <p>Today {" " + Props.value2}</p> : null}
    </div>
  );
}

export default Cards;
