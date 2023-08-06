<script setup>
import { ref } from 'vue'

const totalMovies = ref(Math.floor(Math.random() * 35000))
</script>

<template>
  <footer>
    <p>
      Copyright &copy; {{ new Date().getFullYear() }}. Catalogue de
      <strong>{{ totalMovies }}</strong> films.
    </p>
  </footer>
</template>
