import { $fetch } from 'ofetch'

export function getMovies() {
  return $fetch('http://localhost:3000/movies')
}

export function getMovie(id) {
  return $fetch(`http://localhost:3000/movies/${id}?_expand=genre&_expand=actors`)
}
