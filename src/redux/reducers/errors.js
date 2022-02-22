const initialState = { errors: null, formName: null };

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ERRORS":
      return { errors: action.data, formName: action.formName };
    default:
      return state;
  }
};

export default formReducer;
