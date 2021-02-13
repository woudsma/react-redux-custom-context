import { useCallback } from "react";
import { createStore } from "redux";
import {
  createStoreHook,
  createDispatchHook,
  createSelectorHook,
  useDispatch,
} from "react-redux";

import { SOME_GLOBAL_RESET_FORM_ACTION } from "../../redux/globalStore";
import { formIdSelector, validationRulesSelector } from "./selectors";
import FormContext from "./context";
import { validateInput } from "../../utils/validationUtils";

/**
 * Form reducer constants.
 */
const SET_FORM_ID = "SET_FORM_ID";
const SET_VALUE = "SET_VALUE";
const SET_VALIDATION_RULES = "SET_VALIDATION_RULES";
const RESET_FORM_STATE = "RESET_FORM_STATE";

/**
 * Form reducer initial state.
 */
const initialState = {
  formId: undefined,
  values: {},
  validityValues: {},
  validationRules: {},
};

/**
 * Another standard reducer function.
 * This reducer will only handle form actions.
 *
 * @param {object} state
 * @param {object} action
 * @returns {object} nextState
 */
const reducer = (state = initialState, { type, payload }) => {
  console.log(state, type, payload);
  switch (type) {
    case SET_FORM_ID:
      return { ...state, formId: payload };
    case SET_VALUE:
      return {
        ...state,
        values: {
          ...state.values,
          [payload.key]: payload.value,
        },
        validityValues: {
          ...state.validityValues,
          [payload.key]: payload.isValid,
        },
      };
    case SET_VALIDATION_RULES:
      return {
        ...state,
        validationRules: { ...state.validationRules, ...payload },
      };
    case RESET_FORM_STATE:
      return { ...initialState };
    default:
      return state;
  }
};

/**
 * Redux form store factory function.
 *
 * Note that 'preloadedState' is not used in this example.
 * It's useful when you want to provide a custom initial state
 * when writing tests for example.
 *
 * @param {object} preloadedState Optional, default: undefined
 * @returns {object} store
 */
export const createFormStore = (preloadedState) =>
  createStore(reducer, {
    ...initialState,
    ...preloadedState,
  });

/**
 * Rarely used hook for retrieving the form store directly.
 * Preferably, use useFormSelector to access store values.
 */
export const useFormStore = createStoreHook(FormContext);

/**
 * Form dispatch hook, similar to react-redux's useDispatch hook.
 * Actions dispatched using this hook will only affect the specified context.
 */
export const useFormDispatch = createDispatchHook(FormContext);

/**
 * Form selector hook, similar to react-redux's useSelector.
 * Use this hook to retrieve data from the form store.
 */
export const useFormSelector = createSelectorHook(FormContext);

/**
 * Hook for convenient access to the form Redux actions.
 *
 * @returns {object} formActions
 */
export const useFormActions = () => {
  /**
   * Use useDispatch and useFormDispatch to be able to
   * dispatch actions to both the form store and the global store.
   */
  const dispatch = useDispatch();
  const formDispatch = useFormDispatch();

  /**
   * Get (aka select) some values from the form store with 'useFormSelector'.
   * It's no problem to use these hooks inside other hooks like this.
   */
  const formId = useFormSelector(formIdSelector);
  const validationRules = useFormSelector(validationRulesSelector);

  /**
   * Sets the form id.
   *
   * @param {string} id
   */
  const setFormId = useCallback(
    (id) => formDispatch({ type: SET_FORM_ID, payload: id }),
    [formDispatch],
  );

  /**
   * Sets a form value and does a validation check.
   * We keep track of the value's validity using the 'validityValues' object.
   *
   * @param {string} key
   * @param {string} value
   */
  const setValue = useCallback(
    (key, value) => {
      if (value === undefined) return;

      const isValid = validateInput(value, validationRules?.[key]);

      formDispatch({
        type: SET_VALUE,
        payload: { key, value, isValid },
      });
    },
    [formDispatch, validationRules],
  );

  /**
   * Sets the validation rules.
   *
   * @param {object} validationRules
   */
  const setValidationRules = useCallback(
    (validationRules) =>
      formDispatch({ type: SET_VALIDATION_RULES, payload: validationRules }),
    [formDispatch],
  );

  /**
   * Reset the entire form state in the current context.
   * And - as an example - also update the global Redux store.
   */
  const resetFormValues = useCallback(() => {
    formDispatch({ type: RESET_FORM_STATE });
    dispatch({ type: SOME_GLOBAL_RESET_FORM_ACTION, payload: formId });
  }, [formDispatch, dispatch, formId]);

  return {
    setFormId,
    setValue,
    setValidationRules,
    resetFormValues,
  };
};
