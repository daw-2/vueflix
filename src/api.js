import { $fetch } from 'ofetch'

export function getMovies() {
  return $fetch('https://api.vueflix.boxydev.com/movies')
}

export function getMovie(id) {
  return $fetch(`https://api.vueflix.boxydev.com/movies/${id}?_expand=genre&_expand=actors`)
}

export function getComments(id) {
  return $fetch(`https://api.vueflix.boxydev.com/movies/${id}/comments?_expand=user`)
}

export function postComment(id, message) {
  return $fetch(`https://api.vueflix.boxydev.com/movies/${id}/comments`, {
    method: 'POST',
    body: { message, userId: 1 }
  })
}
