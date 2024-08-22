import React from "react";
import "./Icon.scss";

function Icon({ className, format = "font", type = "material", name }) {
  let componentClass = "icon";
  if (className) {
    componentClass += ` ${className}`;
  }
  if (format === "font" && type === "material") {
    componentClass += " material-icon";
  }

  return <span className={componentClass}>{name}</span>;
}

export default Icon;
