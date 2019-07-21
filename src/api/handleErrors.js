
export const handleErrors = (response, successfulStatusCodes) => {
  if (!successfulStatusCodes.includes(response.status)) {
    throw Error(response.data);
  }
  return response;
};
