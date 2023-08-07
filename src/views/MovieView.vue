<script setup>
import { useRoute } from 'vue-router'
import { getMovie, getComments } from '../api'
import Modal from '../components/Modal.vue'
import { computed, onMounted, ref } from 'vue'
import ColorThief from 'colorthief'

const route = useRoute()
const movie = ref({})
const comments = ref([])
const color = ref([0, 0, 0])
const showModal = ref(false)

const year = computed(() => (date) => new Date(date).getFullYear())
const age = computed(
  () => (date) => new Date(Date.now() - new Date(date).getTime()).getUTCFullYear() - 1970
)
const loadColor = () => {
  const img = new Image()
  img.crossOrigin = 'anonymous'
  img.src = movie.value.backdrop_path

  img.addEventListener('load', () => {
    color.value = new ColorThief().getColor(img)
  })
}

const formatDate = computed(() => (date) => new Date(date).toLocaleDateString('fr'))

const formatDateComment = computed(
  () => (date) =>
    new Date(date).toLocaleString('fr', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    })
)

const duration = computed(() => (runtime) => {
  const hours = Math.floor(runtime / 60)
  const minutes = runtime % 60

  return `${hours}h${minutes < 10 ? 0 : ''}${minutes}`
})
const note = computed(() => (note) => Math.ceil((note * 100) / 10))

onMounted(async () => {
  movie.value = await getMovie(route.params.id)
  comments.value = await getComments(movie.value.id)

  loadColor()
})
</script>

<template>
  <div class="bg-cover bg-center" :style="{ backgroundImage: `url(${movie.backdrop_path})` }">
    <div class="py-6" :style="{ backgroundColor: `rgba(${color}, 0.75)` }">
      <div class="max-w-7xl mx-auto px-3 py-4">
        <div class="flex gap-8">
          <div class="min-w-fit">
            <img
              :src="movie.poster_path"
              :alt="movie.title"
              class="rounded-lg h-[400px] object-cover"
            />
          </div>
          <div class="text-white flex flex-col justify-center">
            <h1 class="text-4xl font-bold">
              {{ movie.title }}
              <span class="text-gray-100 font-light">({{ year(movie.release_date) }})</span>
            </h1>
            <p class="mb-4">
              {{ formatDate(movie.release_date) }} - {{ movie.genre?.name }} -
              {{ duration(movie.runtime) }}
            </p>
            <div class="flex gap-6 mb-4">
              <div
                class="bg-black w-12 h-12 rounded-full border-2"
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
              <button class="flex items-center gap-3" @click="showModal = true">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-12 h-12"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                  />
                </svg>

                <span>Voir la bande annonce</span>
              </button>
            </div>
            <div>
              <p class="italic">{{ movie.tagline }}</p>
              <h3 class="my-3 text-xl font-bold">Synopsis</h3>
              <p>{{ movie.overview }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="max-w-7xl mx-auto px-3 py-4">
    <h2 class="text-2xl font-bold my-4">Casting</h2>

    <div class="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
      <div
        v-for="actor in movie?.actors
          ?.filter((actor) => actor.profile_path)
          .sort((actorA, actorB) => (actorA.order > actorB.order ? 1 : -1))"
        :key="actor.id"
        class="bg-white rounded-lg shadow"
      >
        <img
          :src="actor.profile_path"
          :alt="actor.name"
          class="rounded-t-lg h-[250px] w-full object-cover"
        />
        <div class="p-3">
          <h2 class="font-bold">{{ actor.name }} ({{ age(actor.birthday) }} ans)</h2>
          <p class="text-gray-400">{{ actor.character }}</p>
        </div>
      </div>
    </div>
  </div>

  <div class="max-w-7xl mx-auto px-3 py-4">
    <h2 class="text-2xl font-bold my-4">Commentaires ({{ comments.length }})</h2>

    <div class="bg-white rounded-lg shadow divide-y">
      <div
        v-for="comment in comments.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))"
        :key="comment.id"
      >
        <div class="p-3">
          <div class="flex items-center gap-3 mb-3">
            <img
              class="w-10 rounded-full"
              :src="`https://i.pravatar.cc/50?u=${comment.user.email}`"
              :alt="comment.user.name"
            />
            <p class="text-sm text-gray-500">
              Écrit par <strong>{{ comment.user.name }}</strong> le
              {{ formatDateComment(comment.createdAt) }}
            </p>
          </div>
          <p>{{ comment.message }}</p>
        </div>
      </div>
    </div>
  </div>

  <Teleport to="body">
    <Modal :show="showModal" @close="showModal = false">
      <iframe
        width="100%"
        height="500"
        :src="`https://www.youtube.com/embed/${movie.youtube}`"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </Modal>
  </Teleport>
</template>
