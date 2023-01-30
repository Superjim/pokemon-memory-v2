import React from "react";

function Checkbox({ label, id, range, image, checked, onChange }) {
  return (
    <div className="checkbox" onClick={onChange}>
      {label}
      <br />
      <input type="checkbox" id={id} checked={checked} onChange={onChange} />
      {image && <img src={image} alt={label} width={100} />}
      <span>{range}</span>
    </div>
  );
}

export default Checkbox;
