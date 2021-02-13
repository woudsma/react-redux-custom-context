import { createSelector } from "reselect";

/**
 * These selector can only be used to retrieve values
 * from the 'global' store.
 *
 * Use the selectors in src/components/Form/selectors.js
 * to select values from the form store
 */
export const isInitializedSelector = createSelector(
  (state) => state.initialized,
  (initialized) => initialized,
);
