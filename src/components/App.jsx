import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { isInitializedSelector } from "../redux/selectors";
import { createFakeValidationRules } from "../utils/validationUtils";

import FormContainer from "./Form/FormContainer";

/**
 * App component with some example form components.
 *
 * @returns {React.FC}
 */
const App = () => {
  const dispatch = useDispatch();
  /**
   * I'm selecting a value from the 'global' store using
   * a reselect selector function instead of writing:
   * useSelector((state) => state.initialized)
   */
  const isInitialized = useSelector(isInitializedSelector);

  // It is not advisable to create a subscription to the entire store state
  // in the App component, this is just for demonstration purposes
  const state = useSelector(state => state);
  
  /**
   * A simple example of an existing dispatch function in your app
   */
  useEffect(() => {
    if (!isInitialized) dispatch({ type: "INIT_APP" });
  }, [dispatch, isInitialized]);

  return (
    <div className="App">
      <h1>
        React + Redux app |{" "}
        <span onClick={() => window.location.reload()}>refresh</span>
      </h1>
      <div>
        <p>Global store state:</p>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </div>
      <hr />
      {useMemo(() => (
        <>
          <FormContainer
            formId="homeBillingForm"
            validationRules={createFakeValidationRules()}
          />
          <FormContainer
            formId="homeShippingForm"
            validationRules={createFakeValidationRules()}
          />
          <FormContainer
            formId="guestLoginForm"
            validationRules={createFakeValidationRules()}
          />
        </>
      ), [])}
    </div>
  );
};

export default App;
