import React from "react";
import "./Offcanvas.scss";
import OffcanvasHeader from "./OffcanvasHeader";
import OffcanvasBody from "./OffcanvasBody";

function Offcanvas({
  children,
  className,
  custom,
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
  if (className) {
    componentClass += ` ${className}`;
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
