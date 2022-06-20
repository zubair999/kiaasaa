export const SELECT_ADDRESS = "SELECT_ADDRESS";

export const selectAddress = (addressId) => {
  return { type: SELECT_ADDRESS, payload: addressId};
};