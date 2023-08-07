<script setup>
import { computed, onMounted, ref } from 'vue'
import { getMovies } from '../api'
import { RouterLink } from 'vue-router'
import slugify from 'slugify'
import Button from '../components/Button.vue'
import { useCartStore } from '../stores/cart'

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

const store = useCartStore()

onMounted(async () => (movies.value = await getMovies()))
</script>

<template>
  <div class="max-w-7xl mx-auto px-3 py-4">
    <h1 class="text-4xl text-center font-bold my-12">Films</h1>

    <div class="flex gap-12">
      <div
        class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        :class="{ 'xl:grid-cols-5': store.total === 0 }"
      >
        <div
          v-for="movie in movies"
          :key="movie.id"
          class="bg-white rounded-lg shadow flex flex-col"
        >
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
                'border-yellow-500':
                  note(movie.vote_average) >= 40 && note(movie.vote_average) < 70,
                'border-red-500': note(movie.vote_average) < 40
              }"
            >
              <span class="text-white flex items-center h-full justify-center font-bold"
                >{{ note(movie.vote_average) }}%</span
              >
            </div>
          </div>
          <div class="p-3 flex flex-col justify-between flex-grow">
            <h2 class="font-bold">
              <RouterLink :to="`/films/${movie.id}-${slug(movie.title)}`">{{
                movie.title
              }}</RouterLink>
            </h2>
            <p class="text-gray-400 mb-4">{{ formatDate(movie.release_date) }}</p>

            <Button v-if="store.hasMovie(movie)" @click="store.deleteMovie(movie)">
              Retirer du panier
            </Button>

            <Button v-else @click="store.addMovie(movie)" :disabled="store.total === 4">
              Ajouter au panier
            </Button>
          </div>
        </div>
      </div>

      <div v-if="store.total > 0" class="w-96">
        <div class="sticky top-10 bg-white pt-4 pb-1 rounded-lg shadow px-2">
          <div v-for="item in store.cart" :key="item.movie.id">
            <div class="grid grid-cols-2 items-center mb-3 gap-2">
              <RouterLink :to="`/films/${item.movie.id}-${slug(item.movie.title)}`">
                <img
                  :src="item.movie.poster_path"
                  :alt="item.movie.title"
                  class="h-[100px] w-[75px] mx-auto object-cover"
                />
              </RouterLink>
              <div>
                <h3 class="text-sm font-bold">
                  <RouterLink :to="`/films/${item.movie.id}-${slug(item.movie.title)}`">
                    {{ item.movie.title }}
                  </RouterLink>
                </h3>
                <button @click="store.deleteMovie(item.movie)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 text-red-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
