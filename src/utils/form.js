

export const getFieldError = (error, fieldName) => {
  if (!error) {
    return null
  }
  return error[fieldName] ? error[fieldName] : null;
};
