import request from './request'

export const getBooks = (data) => {
  return request({
    url: '/book/books',
    method: 'POST',
    data
  })
}
