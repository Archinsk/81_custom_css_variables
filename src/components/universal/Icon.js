import "./Icon.scss";

function Icon({ className, name }) {
  let componentClass = "icon material-icon";
  if (className) {
    componentClass += ` ${className}`;
  }

  return <span className={componentClass}>{name}</span>;
}

export default Icon;
