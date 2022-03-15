import { setFormErrors } from "../redux/actions/actions";

export const reduxErrorsValidation = (error, dispatch, formName) => {
  if (error.request.status === 400) {
    let errorsArray = error.response.data.error.details;
    let data = errorsArray.reduce(
      (obj, item) => ((obj[item.context.key] = item.message), obj),
      {}
    );
    dispatch(setFormErrors(data, formName));
  } else {
    return error;
  }
};
