import React from "react";
import "./Offcanvas.scss";
import OffcanvasHeader from "./OffcanvasHeader";
import OffcanvasBody from "./OffcanvasBody";

function Offcanvas({
  children,
  className,
  custom,
  show,
  position,
  id,
  title,
  noCloseButton,
  noBackdrop,
  noKeyboard,
  staticBackdrop,
  openedWidth,
  closedWidth,
  noEffectPoint,
}) {
  let componentClass = "offcanvas";
  if (show) {
    componentClass += " show";
  }
  if (className) {
    componentClass += ` ${className}`;
  }
  if (position) {
    componentClass += ` offcanvas-${position}`;
  }
  let offcanvasContent;
  if (custom) {
    offcanvasContent = children;
  } else {
    offcanvasContent = (
      <>
        {title || !noCloseButton ? (
          <OffcanvasHeader id={id} noCloseButton={noCloseButton}>
            {title}
          </OffcanvasHeader>
        ) : null}
        <OffcanvasBody>{children}</OffcanvasBody>
      </>
    );
  }
  let backdrop;
  if (noBackdrop) {
    backdrop = "false";
  } else if (staticBackdrop) {
    backdrop = "static";
  }
  return (
    <div
      className={componentClass}
      id={id}
      tabIndex="-1"
      aria-labelledby={id + "Label"}
      data-bs-backdrop={backdrop}
      data-bs-keyboard={noKeyboard ? "false" : null}
    >
      {offcanvasContent}
    </div>
  );
}

export default Offcanvas;
