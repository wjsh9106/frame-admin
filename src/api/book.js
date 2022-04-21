import request from './request'

export const getBooks = (data) => {
  return request({
    url: '/book/books',
    method: 'POST',
    data
  })
}

export const getChapterTitles = (bookId) => {
  return request({
    url: `/chapter/chapterTitles/${bookId}`,
    method: 'GET'
  })
}

export const getChapterInfo = (chapterId) => {
  return request({
    url: `/chapter/chapterInfo/${chapterId}`,
    method: 'GET'
  })
}
