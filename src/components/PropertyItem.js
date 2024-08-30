import React from "react";

function PropertyItem({ name, value }) {
  return (
    <div className="item-property">
      <div className="item-property-name">{name}</div>
      <div className="item-property-value">{value}</div>
    </div>
  );
}

export default PropertyItem;
