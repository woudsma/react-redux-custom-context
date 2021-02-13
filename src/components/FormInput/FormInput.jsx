import React from "react";

/**
 * Example input presentational component.
 *
 * @returns {React.FC}
 */
const FormInput = ({ name, onChange }) => (
  <div className="FormInput">
    <label htmlFor={name}>{name}</label>
    <br />
    <input type="text" id={name} name={name} onChange={onChange} />
    <br />
  </div>
);

export default FormInput;
