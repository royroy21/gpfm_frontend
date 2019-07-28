

export const getFieldError = (error, fieldName) => {
  if (!error) {
    return false
  }
  if (error[fieldName]) {
    return error[fieldName]
  } else {
    return false
  }
};
