import { $fetch } from 'ofetch'

export function movies() {
  return $fetch('http://localhost:3000/movies')
}
