<script setup>
import { computed, onMounted, ref } from 'vue'
import { getMovies } from '../api'
import { RouterLink } from 'vue-router'
import slugify from 'slugify'

const movies = ref([])
const formatDate = computed(
  () => (date) =>
    new Date(date).toLocaleDateString('fr', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
)
const note = computed(() => (note) => Math.ceil((note * 100) / 10))
const slug = computed(() => (title) => slugify(title, { lower: true }))

onMounted(async () => (movies.value = await getMovies()))
</script>

<template>
  <div class="max-w-7xl mx-auto px-3 py-4">
    <h1 class="text-4xl text-center font-bold my-12">Films</h1>

    <div class="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
      <div v-for="movie in movies" :key="movie.id" class="bg-white rounded-lg shadow">
        <div class="relative">
          <RouterLink :to="`/films/${movie.id}-${slug(movie.title)}`">
            <img
              :src="movie.poster_path"
              :alt="movie.title"
              class="rounded-t-lg h-[350px] w-full object-cover"
            />
          </RouterLink>
          <div
            class="absolute bottom-2 left-2 bg-black w-12 h-12 rounded-full border-2"
            :class="{
              'border-green-500': note(movie.vote_average) >= 70,
              'border-yellow-500': note(movie.vote_average) >= 40 && note(movie.vote_average) < 70,
              'border-red-500': note(movie.vote_average) < 40
            }"
          >
            <span class="text-white flex items-center h-full justify-center font-bold"
              >{{ note(movie.vote_average) }}%</span
            >
          </div>
        </div>
        <div class="p-3">
          <h2 class="font-bold">
            <RouterLink :to="`/films/${movie.id}-${slug(movie.title)}`">{{
              movie.title
            }}</RouterLink>
          </h2>
          <p class="text-gray-400">{{ formatDate(movie.release_date) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
