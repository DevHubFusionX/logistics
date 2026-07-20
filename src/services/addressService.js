/**
 * addressService — STUB
 *
 * The backend does NOT have any /addresses/ routes.
 * All methods below are stubs that log a warning and resolve with empty data.
 */
const noOp = (name) => (...args) => {
  console.warn(`addressService.${name}() called — no backend endpoint exists.`)
  return Promise.resolve({ data: [], message: 'Not implemented' })
}

export default {
  getAddresses: noOp('getAddresses'),
  getAddress: noOp('getAddress'),
  createAddress: noOp('createAddress'),
  updateAddress: noOp('updateAddress'),
  deleteAddress: noOp('deleteAddress'),
  setDefaultAddress: noOp('setDefaultAddress'),
}
