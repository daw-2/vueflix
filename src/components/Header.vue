<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const logged = ref(false)
</script>

<template>
  <header class="bg-gray-700">
    <div class="max-w-7xl mx-auto px-3 py-4">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl text-white font-bold">Vue<span class="text-red-400">Flix</span></h1>
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
            <button
              class="bg-red-700 py-2 px-4 rounded text-sm hover:bg-red-800 duration-200 ml-6"
              v-else
              @click="logged = true"
            >
              Connexion
            </button>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>
