import React from "react";
import CardHeader from "./CardHeader";
import CardBody from "./CardBody";
import CardFooter from "./CardFooter";
import CardWithImages from "./CardWithImages";

function Card({
  children,
  className,
  header,
  footer,
  noBody,
  imageFull,
  imageStart,
  imageEnd,
  horizontal,
  imageStartCols,
  imageEndCols,
  custom,
  onClick,
}) {
  let cardClass = "card";
  if (className) {
    cardClass += ` ${className}`;
  }

  if (custom) {
    return (
      <div className={cardClass} onClick={onClick}>
        {children}
      </div>
    );
  } else if (imageFull || imageStart || imageEnd || horizontal) {
    return (
      <CardWithImages
        className={className}
        imageFull={imageFull}
        imageStart={imageStart}
        imageEnd={imageEnd}
        horizontal={horizontal}
        imageStartCols={imageStartCols}
        imageEndCols={imageEndCols}
        onClick={onClick}
      >
        {children}
      </CardWithImages>
    );
  } else {
    let headerContent;
    let bodyContent = children;
    let footerContent;

    if (header && footer && !noBody && children.length === 3) {
      [headerContent, bodyContent, footerContent] = children;
    } else if (children.length === 2) {
      if (header && !noBody && !footer) {
        [headerContent, bodyContent] = children;
      } else if (!header && !noBody && footer) {
        [bodyContent, footerContent] = children;
      }
    }

    return (
      <div className={cardClass} onClick={onClick}>
        {header ? <CardHeader>{headerContent}</CardHeader> : null}
        {!noBody ? <CardBody>{bodyContent}</CardBody> : null}
        {footer ? <CardFooter>{footerContent}</CardFooter> : null}
      </div>
    );
  }
}

export default Card;
