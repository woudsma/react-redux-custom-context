import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Provider, useDispatch, connect } from "react-redux";

import { SOME_GLOBAL_UPDATE_FORM_ACTION } from "../../redux/globalStore";
import { createFormStore, useFormActions, useFormSelector } from "./hooks";
import { valuesSelector, requiredFieldsFilledSelector } from "./selectors";
import FormContext from "./context";

import Form from "./Form";
import FormInputContainer from "../FormInput/FormInputContainer";

/**
 * Form container component.
 * In this component we will handle business logic.
 *
 * @returns {React.FC}
 */
const FormContainer = ({ formId, validationRules, children, ...props }) => {
  /**
   * We're still free to use the 'global' dispatch function wherever we like.
   */
  const dispatch = useDispatch();

  const { setFormId, setValidationRules } = useFormActions();

  /**
   * Get values from the form store using our
   * custom Redux hook 'useFormSelector'.
   */
  const values = useFormSelector(valuesSelector);
  const requiredFieldsFilled = useFormSelector(requiredFieldsFilledSelector);

  useEffect(() => {
    setFormId(formId);
    setValidationRules(validationRules);
  }, [setFormId, formId, setValidationRules, validationRules]);

  const onSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();

      console.log(requiredFieldsFilled, values);

      if (requiredFieldsFilled) {
        dispatch({
          type: SOME_GLOBAL_UPDATE_FORM_ACTION,
          payload: { formId, values },
        });
      }
    },
    [dispatch, requiredFieldsFilled, formId, values],
  );

  return (
    <Form onSubmit={onSubmitHandler}>
      <div className="formInputs">
        {validationRules?.map((validationRule) => (
          <FormInputContainer
            key={validationRule.index}
            name={`${formId}-FormInput-${validationRule.index}`}
          />
        ))}
        <button type="submit">Submit</button>
      </div>
      <div className="storeState">
        <p>{formId} Redux store state:</p>
        <pre>{JSON.stringify(values, null, 2)}</pre>
      </div>
    </Form>
  );
};

/**
 * Connected form container component.
 * Connects the component to the form context.
 * This allow the use of custom Redux hooks.
 * https://react-redux.js.org/next/api/hooks#custom-context
 */
const ConnectedFormContainer = connect(null, null, null, {
  context: FormContext,
})(FormContainer);

/**
 * Form container provider.
 * Provides a Redux store for each form instance and renders the connected form container.
 * https://react-redux.js.org/using-react-redux/accessing-store#providing-custom-context
 *
 * You can provide an optional parameter 'store' which can be useful when writing tests.
 * (not covered in this blog post)
 *
 * @returns {React.FC}
 */
const FormContainerProvider = ({ store, children, ...props }) => {
  /**
   * Create a new store for every instance of FormContainerProvider.
   * 'useMemo' makes sure we create the store only once before the component will mount.
   * 'useRef' makes sure we get a consistent reference to the store object.
   */
  const formStore = useMemo(() => store || createFormStore(), [store]);
  const { current } = useRef(formStore);

  return (
    <Provider context={FormContext} store={current}>
      <ConnectedFormContainer {...props}>{children}</ConnectedFormContainer>
    </Provider>
  );
};

/**
 * Export the form container provider instead of the form container component.
 */
export { FormContainerProvider as default };
