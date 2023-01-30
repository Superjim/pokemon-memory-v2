import React, { useState } from "react";

function Checkbox({ label, id, range, image, checked, onChange }) {
  return (
    <div className="checkbox" onClick={onChange}>
      {label}
      <br />
      <input type="checkbox" id={id} checked={checked} onChange={onChange} />
      <span>{range}</span>
      {/* {image && <img src={image} alt={label} width={100} height={100} />} */}
    </div>
  );
}

export default Checkbox;
