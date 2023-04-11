import React from "react";

interface CheckboxProps {
  label: string;
  id: string;
  range: string;
  image?: string;
  checked: boolean;
  onChange: () => void;
}

function Checkbox({
  label,
  id,
  range,
  image,
  checked,
  onChange,
}: CheckboxProps) {
  return (
    <div
      className="checkbox"
      onClick={onChange}
      style={{
        border: checked ? "3px solid green" : "3px solid red",
      }}
    >
      {label}
      {image && <img src={image} alt={label} width={100} />}
      <input type="checkbox" id={id} checked={checked} onChange={onChange} />
      <span>{range}</span>
    </div>
  );
}

export default Checkbox;
