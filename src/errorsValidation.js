export const errorsValidation = (error, setErrors) => {
  if (error.request.status === 422) {
    let errorsArray = error.response.data.error.details;
    let errors = errorsArray.reduce(
      (obj, item) => ((obj[item.context.key] = item.message), obj),
      {}
    );
    setErrors(errors);
  } else {
    return error;
  }
};
