/**
 * uploadService — STUB
 *
 * The backend does NOT have any /uploads/ routes.
 * All methods below are stubs that log a warning and resolve silently.
 */
const noOp = (name) => (...args) => {
  console.warn(`uploadService.${name}() called — no backend endpoint exists.`)
  return Promise.resolve({ data: null, message: 'Not implemented' })
}

const uploadService = {
  uploadDocument: noOp('uploadDocument'),
  uploadPaymentProof: noOp('uploadPaymentProof'),
  uploadProfilePicture: noOp('uploadProfilePicture'),
  getDocuments: noOp('getDocuments'),
  deleteDocument: noOp('deleteDocument'),
}

export default uploadService
