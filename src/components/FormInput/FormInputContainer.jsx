import React, { useCallback } from "react";

import { useFormActions } from "../Form/hooks";

import FormInput from "./FormInput";

/**
 * Form input container component.
 *
 * @returns {React.FC}
 */
const FormInputContainer = ({ name, ...props }) => {
  /**
   * ❌ creates a subscription and triggers a re-render on all updates to FormContext.
   */
  // const { someValue } = useContext(FormContext)

  /**
   * ⚠️ creates a subscription to a single store value.
   */
  // const someValue = useFormSelector(state => state.someValue)

  /**
   * ✅ creates a memoized subscription to a single store value.
   */
  // const someValue = useFormSelector(someValueSelector)

  const { setValue } = useFormActions();

  const onChangeHandler = useCallback((e) => setValue(name, e.target.value), [
    setValue,
    name,
  ]);

  return (
    <FormInput name={name} onChange={onChangeHandler} {...props} />
  );
};

export default FormInputContainer;
