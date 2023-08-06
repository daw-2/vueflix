<script setup>
import { onMounted, ref } from 'vue'
import { movies } from '../api'

const totalMovies = ref(Math.floor(Math.random() * 35000))

onMounted(async () => {
  totalMovies.value = (await movies()).length
})
</script>

<template>
  <footer>
    <p>
      Copyright &copy; {{ new Date().getFullYear() }}. Catalogue de
      <strong>{{ totalMovies }}</strong> films.
    </p>
  </footer>
</template>
