const dashboardReducer = (state = { reducerData: null }, action) => {
  switch (action.type) {
    case "CREATE":
      return { ...state, reducerData: action.data };
    default:
      return state;
  }
};

export default dashboardReducer;
