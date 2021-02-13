import React from "react";
import './Form.css';

/**
 * Form presentational component.
 *
 * @returns {React.FC}
 */
const Form = ({ children, ...props }) => (
  <form className="Form" {...props}>
    {children}
  </form>
);

export default Form;
