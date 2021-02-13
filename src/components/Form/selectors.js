import {
  createSelector,
  createSelectorCreator,
  defaultMemoize,
} from "reselect";
import isEqual from "react-fast-compare";

/**
 * Creates a custom selector creator function.
 * The resulting selector performs a deep equality comparison.
 * Uses the 'isEqual' function from 'react-fast-compare'
 * Useful for memoization of values of type object or array.
 *
 * The default 'createSelector' performs strict reference equality comparison (with '===').
 */
export const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  isEqual,
);

/**
 * Composable memoized Redux selector functions.
 * Syntax: createSelector|createDeepEqualSelector(...inputSelectors, resultFn)
 * https://github.com/reduxjs/reselect
 *
 * Each selector must be a 'pure' function.
 * A benefit of this is that it makes selectors very reliable and easily testable.
 */
export const formIdSelector = createSelector(
  (state) => state?.formId,
  (formId) => formId,
);

export const valuesSelector = createDeepEqualSelector(
  (state) => state?.values || {},
  (values) => values,
);

export const validationRulesSelector = createDeepEqualSelector(
  (state) => state?.validationRules || {},
  (validationRules) => validationRules,
);

export const validityValuesSelector = createDeepEqualSelector(
  (state) => state?.validityValues || {},
  (validityValues) => validityValues,
);

/**
 * Before, we would calculate a value like this inside (multiple) components.
 * In this new approach we can move the computation to a re-usable selector, like this:
 */
export const requiredFieldsFilledSelector = createSelector(
  valuesSelector,
  validationRulesSelector,
  validityValuesSelector,
  (values, validationRules, validityValues) =>
    Object.keys(values)
      .filter((key) => validationRules?.[key]?.required)
      .every((key) => validityValues?.[key] === true),
);
