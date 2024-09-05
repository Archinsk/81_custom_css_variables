import React from "react";
import "./Button.scss";
import Icon from "./Icon";
import Badge from "./Badge";

function Button({
  children,
  className,
  type = "button",
  size,
  block,
  square,
  icon,
  badge,
  onClick,
}) {
  let componentClass = "button";
  if (size && ["small", "large"].includes(size)) {
    componentClass += ` button-${size}`;
  }
  if (block) {
    componentClass += " button-block";
  }
  if (square) {
    componentClass += " button-square";
  }
  if (icon) {
    componentClass += " button-icon";
  }
  if (badge) {
    componentClass += " button-badge";
  }
  if (className) {
    componentClass += ` ${className}`;
  }

  return (
    <button type={type} className={componentClass} onClick={onClick}>
      {icon ? (
        <Icon
          name={typeof icon === "string" ? icon : icon.name}
          format={icon.format}
          type={icon.type}
        />
      ) : null}
      {!(icon && square) ? <span>{children}</span> : null}
      {badge ? <Badge className={badge.className}>{badge.text}</Badge> : null}
    </button>
  );
}

export default Button;
