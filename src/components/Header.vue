<script setup>
import Button from './Button.vue'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const logged = ref(false)
const opened = ref(false)
</script>

<template>
  <header class="bg-gray-700 relative">
    <div class="max-w-7xl mx-auto px-3 py-4">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl text-white font-bold">
          <RouterLink to="/" class="px-2">Vue<span class="text-red-400">Flix</span></RouterLink>
        </h1>
        <nav class="text-white items-center hidden md:flex">
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
            <Button v-else @click="logged = true" class="ml-6">Connexion</Button>
          </div>
        </nav>
        <button class="flex md:hidden" @click="opened = !opened">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-white" v-if="!opened">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-white" v-else>
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <nav class="px-3 gap-3 pb-4 flex flex-col absolute z-10 top-full left-0 bg-gray-700 text-white w-full" v-if="opened">
          <RouterLink to="/" class="px-2">Accueil</RouterLink>
          <RouterLink to="/films" class="px-2">Films</RouterLink>
          <RouterLink to="/a-propos" class="px-2">A propos</RouterLink>
          <div class="flex items-center space-x-3 px-2">
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
