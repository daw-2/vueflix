<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <Header />

  <div class="max-w-7xl mx-auto px-3 py-4">
    <RouterView />
  </div>

  <Footer />
</template>

<style scoped></style>
