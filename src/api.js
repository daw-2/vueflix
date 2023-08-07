import { $fetch } from 'ofetch'

export function getMovies() {
  return $fetch('http://localhost:3000/movies')
}
