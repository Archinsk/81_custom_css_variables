import React from "react";
import { useState } from "react";
import "./Collapse.scss";

function Collapse({ children, id, accordionId, className, show }) {
  const [collapseShow, setCollapseShow] = useState(false);
  const [isCollapsing, setIsCollapsing] = useState(false);

  /*if (!collapseShow && show) {
    // Открытие коллапса
    setIsCollapsing(true);
  } else if (collapseShow && !show) {
    // Закрытие коллапса
    setIsCollapsing(true);
  }*/
  let collapseClass = isCollapsing ? "collapsing" : "collapse";
  if (className) {
    collapseClass += ` ${className}`;
  }
  if (show) {
    collapseClass += " show";
  }
  return (
    <div
      className={collapseClass}
      id={id}
      data-bs-parent={accordionId ? "#" + accordionId : null}
      onTransitionEnd={() => {
        setIsCollapsing(false);
      }}
    >
      {children}
      <div>This is collapse area</div>
    </div>
  );
}

export default Collapse;
