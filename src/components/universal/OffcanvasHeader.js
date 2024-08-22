import React from "react";
import "./OffcanvasHeader.scss";
import Button from "./Button";

function OffcanvasHeader({ children, id, noTitle, noCloseButton }) {
  return (
    <div className="offcanvas-header">
      {noTitle ? (
        children
      ) : (
        <h5 className="offcanvas-title" id={id + "Label"}>
          {children}
        </h5>
      )}
      {noCloseButton ? null : <Button square icon="close" />}
    </div>
  );
}

export default OffcanvasHeader;
