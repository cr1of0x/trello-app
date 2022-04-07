import { Provider } from "react-redux";
import { store } from "../redux/store";

export const withProvider = (Component) => {
  const NewComponent = (props) => {
    return (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );
  };

  return NewComponent;
};
