import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
  const cart = ref([])
  const total = computed(() => cart.value.reduce((prev, current) => prev + current.quantity, 0))
  const hasMovie = computed(
    () => (movie) => cart.value.find((i) => i.movie.id === movie.id) !== undefined
  )
  const addMovie = (movie) => {
    cart.value.push({ quantity: 1, movie })
  }
  const deleteMovie = (movie) =>
    cart.value.splice(cart.value.map((i) => i.movie.id).indexOf(movie.id), 1)

  return { cart, total, hasMovie, addMovie, deleteMovie }
})
