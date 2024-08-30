import React from "react";

function CardFooter({ children, className }) {
  let cardFooterClass = "card-footer";
  if (className) {
    cardFooterClass += ` ${className}`;
  }
  return <div className={cardFooterClass}>{children}</div>;
}

export default CardFooter;
