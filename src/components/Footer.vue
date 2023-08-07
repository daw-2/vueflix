<script setup>
import { onMounted, ref } from 'vue'
import { getMovies } from '../api'

const totalMovies = ref(Math.floor(Math.random() * 35000))

onMounted(async () => {
  totalMovies.value = (await getMovies()).length
})
</script>

<template>
  <footer class="mt-10">
    <div class="max-w-7xl mx-auto px-3 py-12 border-t border-gray-300">
      <p class="text-center">
        Copyright &copy; {{ new Date().getFullYear() }}. Catalogue de
        <strong>{{ totalMovies }}</strong> films.
      </p>
    </div>
  </footer>
</template>
