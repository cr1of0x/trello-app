export const reduxErrorsValidation = (error, dispatch, formData) => {
  if (error.request.status === 400) {
    let errorsArray = error.response.data.error.details;
    let data = errorsArray.reduce(
      (obj, item) => ((obj[item.context.key] = item.message), obj),
      {}
    );
    dispatch({ type: "SET_ERRORS", data: data, formName: formData.formName });
  } else {
    return error;
  }
};
