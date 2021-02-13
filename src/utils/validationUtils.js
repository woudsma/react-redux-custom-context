/**
 * Just a single example of all the utility functions
 * that we would use in our complex form.
 *
 * @param {string} value An input value
 * @param {object} validationRule A dynamic validation rule
 * @returns {boolean} isValid
 */
export const validateInput = (value, validationRule) => {
  if ((value === undefined || value === "") && validationRule?.isRequired) {
    return false;
  }

  if (value && value?.length > validationRule?.maxLength) {
    return false;
  }

  return true;
};

export const createFakeValidationRules = () =>
  new Array(Math.max(Math.max(0, 1), parseInt(Math.random() * 6))).fill("").map((_, index) => ({
    index,
    isRequired: Math.random() > 0.5,
    maxLength: Math.random() > 0.5 ? 10 : 30,
  }));
