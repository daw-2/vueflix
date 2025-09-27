import { $fetch } from 'ofetch'

const url = 'https://api.vueflix.boxydev.com'
// const url = 'http://localhost:3001'

export function getMovies() {
  return $fetch(`${url}/movies`)
}

export function getMovie(id) {
  return $fetch(`${url}/movies/${id}?_expand=genre&_expand=actors`)
}

export function getComments(id) {
  return $fetch(`${url}/movies/${id}/comments?_expand=user`)
}

export function postComment(id, message) {
  return $fetch(`${url}/movies/${id}/comments`, {
    method: 'POST',
    body: { message, userId: 1 }
  })
}
