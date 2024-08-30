import React from "react";

function CardBody({ children, className }) {
  let cardBodyClass = "card-body";
  if (className) {
    cardBodyClass += ` ${className}`;
  }
  return <div className={cardBodyClass}>{children}</div>;
}

export default CardBody;
