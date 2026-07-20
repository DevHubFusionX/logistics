/**
 * supportService — STUB
 *
 * The backend does NOT have any /support/ routes.
 * All methods below are stubs that log a warning and resolve with empty data.
 */
const noOp = (name) => (...args) => {
  console.warn(`supportService.${name}() called — no backend endpoint exists. This is a no-op.`)
  return Promise.resolve({ data: [], message: 'Not implemented' })
}

const supportService = {
  getTickets: noOp('getTickets'),
  getTicket: noOp('getTicket'),
  createTicket: noOp('createTicket'),
  addTicketMessage: noOp('addTicketMessage'),
  resolveTicket: noOp('resolveTicket'),
}

export default supportService
