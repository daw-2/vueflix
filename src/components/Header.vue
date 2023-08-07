<script setup>
import Button from './Button.vue'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const logged = ref(false)
</script>

<template>
  <header class="bg-gray-700">
    <div class="max-w-7xl mx-auto px-3 py-4">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl text-white font-bold">
          <RouterLink to="/" class="px-2">Vue<span class="text-red-400">Flix</span></RouterLink>
        </h1>
        <nav class="text-white flex items-center">
          <RouterLink to="/" class="px-2">Accueil</RouterLink>
          <RouterLink to="/films" class="px-2">Films</RouterLink>
          <RouterLink to="/a-propos" class="px-2">A propos</RouterLink>
          <div class="flex items-center ml-6 space-x-3">
            <template v-if="logged">
              <strong class="text-lg">Fiorella</strong>
              <img
                class="w-10 rounded-full"
                src="https://i.pravatar.cc/50?u=fiorella@boxydev.com"
                alt="Fiorella"
              />
              <button @click="logged = false">X</button>
            </template>
            <Button v-else @click="logged = true">Connexion</Button>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>
