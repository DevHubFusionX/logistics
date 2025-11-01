import httpClient from './httpClient'

export default {
  getAddresses: () => httpClient.request('/addresses'),
  getAddress: (addressId) => {
    if (!addressId) throw new Error('addressId is required')
    return httpClient.request(`/addresses/${encodeURIComponent(addressId)}`)
  },
  createAddress: (addressData) => httpClient.request('/addresses', {
    method: 'POST',
    body: JSON.stringify(addressData)
  }),
  updateAddress: (addressId, addressData) => {
    if (!addressId) throw new Error('addressId is required')
    return httpClient.request(`/addresses/${encodeURIComponent(addressId)}`, {
      method: 'PUT',
      body: JSON.stringify(addressData)
    })
  },
  deleteAddress: (addressId) => {
    if (!addressId) throw new Error('addressId is required')
    return httpClient.request(`/addresses/${encodeURIComponent(addressId)}`, {
      method: 'DELETE'
    })
  },
  setDefaultAddress: (addressId) => {
    if (!addressId) throw new Error('addressId is required')
    return httpClient.request(`/addresses/${encodeURIComponent(addressId)}/set-default`, {
      method: 'POST'
    })
  }
}
