import "./Badge.scss";

function Badge({ children, className }) {
  let componentClass = "badge";
  if (className) {
    componentClass += ` ${className}`;
  }

  return <span className={componentClass}>{children}</span>;
}

export default Badge;
