import React from "react";

function CardHeader({ children, className }) {
  let cardHeaderClass = "card-header";
  if (className) {
    cardHeaderClass += ` ${className}`;
  }
  return <div className={cardHeaderClass}>{children}</div>;
}

export default CardHeader;
