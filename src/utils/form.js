

export const getFieldError = (error, fieldName) => {
  if (!error) {
    return false
  }
  return error[fieldName] ? error[fieldName] : false;
};
