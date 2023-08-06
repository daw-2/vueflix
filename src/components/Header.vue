<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const logged = ref(false)
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Accueil</RouterLink>
      <RouterLink to="/a-propos">A propos</RouterLink>
      <template v-if="logged">
        <span>Fiorella</span>
        <img src="https://i.pravatar.cc/50?u=fiorella@boxydev.com" alt="Fiorella" />
        <button @click="logged = false">X</button>
      </template>
      <button v-else @click="logged = true">Connexion</button>
    </nav>
  </header>
</template>
