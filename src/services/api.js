import httpClient from './httpClient'

const api = {
  post: (url, data) => httpClient.request(url, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  get: (url, params) => httpClient.request(url, {}, params),
  patch: (url, data) => httpClient.request(url, {
    method: 'PATCH',
    body: JSON.stringify(data)
  }),
  delete: (url) => httpClient.request(url, { method: 'DELETE' })
}

export default api