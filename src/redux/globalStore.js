import { createStore } from "redux";

/**
 * Define and export action types.
 */
export const INIT_APP = "INIT_APP";
export const SOME_GLOBAL_UPDATE_FORM_ACTION = "SOME_GLOBAL_UPDATE_FORM_ACTION";
export const SOME_GLOBAL_RESET_FORM_ACTION = "SOME_GLOBAL_RESET_FORM_ACTION";

/**
 * Example 'global' Redux store
 * that might exist in your app already.
 */
const initialState = {
  initialized: false,
  forms: {},
  someUserData: {},
  // ... etc
};

/**
 * A standard reducer function.
 *
 * @param {object} state
 * @param {object} action
 * @returns {object} nextState
 */
const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case INIT_APP:
      return {
        ...state,
        initialized: true,
      };
    case SOME_GLOBAL_UPDATE_FORM_ACTION:
      return {
        ...state,
        forms: { ...state.forms, [payload.formId]: payload.values },
      };
    case SOME_GLOBAL_RESET_FORM_ACTION:
      return {
        ...state,
        forms: Object.fromEntries(
          Object.entries(state.forms).filter(([key]) => key !== payload.formId),
        ),
      };
    // ... etc
    default:
      return state;
  }
};

export default createStore(reducer);
