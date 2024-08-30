import React from "react";
import CardBody from "./CardBody";

function CardWithImages({
  children,
  className,
  imageFull,
  imageStart,
  imageEnd,
  horizontal,
  imageStartCols,
  imageEndCols,
  onClick,
}) {
  let cardClass = "card";
  if (className) {
    cardClass += ` ${className}`;
  }

  if (imageFull) {
    let image = addClassNameToChildComponent(children[0], "card-img");
    let content;
    if (children.length > 1) {
      content = children.slice(1);
    }

    return (
      <div className={cardClass}>
        {image}
        <div className="card-img-overlay">{content}</div>
      </div>
    );
  } else {
    let imageStartContainer;
    let imageStartContainerClass;
    let bodyContent = children;
    let imageEndContainer;
    let imageEndContainerClass;

    if (horizontal) {
      imageStartContainerClass = imageStartCols
        ? `col-${imageStartCols}`
        : "col-4";
      imageEndContainerClass = imageEndCols ? `col-${imageEndCols}` : "col-4";

      if (children.length === 3) {
        let firstImage = addClassNameToChildComponent(
          children[0],
          "img-fluid rounded-start w-100"
        );
        imageStartContainer = (
          <div className={imageStartContainerClass}>{firstImage}</div>
        );
        bodyContent = children[1];
        let secondImage = addClassNameToChildComponent(
          children[2],
          "img-fluid rounded-end w-100"
        );
        imageEndContainer = (
          <div className={imageEndContainerClass}>{secondImage}</div>
        );
      } else if (children.length === 2) {
        if (imageStart && !imageEnd) {
          let firstImage = addClassNameToChildComponent(
            children[0],
            "img-fluid rounded-start w-100"
          );
          imageStartContainer = (
            <div className={imageStartContainerClass}>{firstImage}</div>
          );
          bodyContent = children[1];
        } else if (imageEnd && !imageStart) {
          bodyContent = children[0];
          let secondImage = addClassNameToChildComponent(
            children[1],
            "img-fluid rounded-end w-100"
          );
          imageEndContainer = (
            <div className={imageEndContainerClass}>{secondImage}</div>
          );
        }
      }

      return (
        <div className={cardClass} onClick={onClick}>
          <div className="row g-0">
            {imageStart ? imageStartContainer : null}
            <div className="col">
              <CardBody>{bodyContent}</CardBody>
            </div>
            {imageEnd ? imageEndContainer : null}
          </div>
        </div>
      );
    } else {
      if (imageStart && imageEnd && children.length === 3) {
        [imageStartContainer, bodyContent, imageEndContainer] = children;
      } else if (children.length === 2) {
        if (imageStart && !imageEnd) {
          [imageStartContainer, bodyContent] = children;
        } else if (imageEnd && !imageStart) {
          [bodyContent, imageEndContainer] = children;
        }
      }
      if (imageStartContainer) {
        imageStartContainer = addClassNameToChildComponent(
          imageStartContainer,
          "card-img-top"
        );
      }
      if (imageEndContainer) {
        imageEndContainer = addClassNameToChildComponent(
          imageEndContainer,
          "card-img-bottom"
        );
      }

      return (
        <div className={cardClass} onClick={onClick}>
          {imageStart ? imageStartContainer : null}
          <CardBody>{bodyContent}</CardBody>
          {imageEnd ? imageEndContainer : null}
        </div>
      );
    }
  }

  function addClassNameToChildComponent(childComponent, additionalClasses) {
    if (childComponent && additionalClasses) {
      return React.cloneElement(childComponent, {
        className: childComponent.className
          ? childComponent.className + " " + additionalClasses
          : additionalClasses,
      });
    }
  }
}

export default CardWithImages;
