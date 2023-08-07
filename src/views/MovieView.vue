<script setup>
import { useRoute } from 'vue-router'
import { getMovie } from '../api'
import { computed, onMounted, ref } from 'vue'
import ColorThief from 'colorthief'

const route = useRoute()
const movie = ref({})
const color = ref(null)

const year = computed(() => (date) => new Date().getFullYear())
const loadColor = () => {
  const img = new Image()
  img.crossOrigin = 'anonymous'
  img.src = movie.value.backdrop_path

  img.addEventListener('load', () => {
    color.value = new ColorThief().getColor(img)
  })
}

const formatDate = computed(() => (date) => new Date(date).toLocaleDateString('fr'))

const duration = computed(() => (runtime) => {
  const hours = Math.floor(runtime / 60)
  const minutes = runtime % 60

  return `${hours}h${minutes < 10 ? 0 : ''}${minutes}`
})

onMounted(async () => {
  movie.value = await getMovie(route.params.id)

  loadColor()
})
</script>

<template>
  <div class="bg-cover bg-center" :style="{ backgroundImage: `url(${movie.backdrop_path})` }">
    <div class="py-6" :style="{ backgroundColor: `rgba(${color}, 0.5)` }">
      <div class="max-w-7xl mx-auto px-3 py-4">
        <div class="flex gap-8">
          <div>
            <img
              :src="movie.poster_path"
              :alt="movie.title"
              class="rounded-lg h-[400px] object-cover"
            />
          </div>
          <div class="text-white">
            <h1 class="text-4xl text-center font-bold">
              {{ movie.title }}
              <span class="text-gray-100 font-normal">({{ year(movie.release_date) }})</span>
            </h1>
            <p>
              {{ formatDate(movie.release_date) }} - {{ movie.genre?.name }} -
              {{ duration(movie.runtime) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
