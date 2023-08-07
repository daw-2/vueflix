<script setup>
import Button from '../components/Button.vue'
import { ref } from 'vue'

const team = ref([
  {
    id: 1,
    name: 'Fiorella',
    job: 'Manager',
    avatar: 'https://i.pravatar.cc/150?u=fiorella@boxydev.com',
    biography:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam mollitia voluptatum sunt placeat aliquam iusto exercitationem at? Vel itaque porro quis saepe quod soluta alias facere eum deleniti? Rem, eveniet.'
  },
  {
    id: 2,
    name: 'Matthieu',
    job: 'Développeur',
    avatar: 'https://i.pravatar.cc/150?u=matthieu@boxydev.com',
    biography:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam mollitia voluptatum sunt placeat aliquam iusto exercitationem at? Vel itaque porro quis saepe quod soluta alias facere eum deleniti? Rem, eveniet.'
  },
  {
    id: 3,
    name: 'Marina',
    job: 'Commerciale',
    avatar: 'https://i.pravatar.cc/150?u=marina@boxydev.com',
    biography:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam mollitia voluptatum sunt placeat aliquam iusto exercitationem at? Vel itaque porro quis saepe quod soluta alias facere eum deleniti? Rem, eveniet.'
  }
])
const isOpen = ref(null)
const opening = ref(false)

const showBiography = (user) => {
  opening.value = user.id

  setTimeout(() => {
    isOpen.value = user.id
    opening.value = false
  }, 500)
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-3 py-4">
    <h1 class="text-4xl text-center font-bold my-12">A propos</h1>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="user in team" :key="user.id" class="bg-white p-4 rounded-lg shadow">
        <div class="grid grid-cols-2 items-center">
          <div>
            <img :src="user.avatar" :alt="user.name" class="rounded-full mx-auto w-32" />
            <h2 class="font-bold text-xl text-center mt-2">{{ user.name }}</h2>
          </div>
          <div>
            <div class="text-center">
              <p class="font-bold mb-3">{{ user.job }}</p>
              <Button
                v-if="isOpen !== user.id"
                :loading="opening === user.id"
                @click="showBiography(user)"
                >Voir biographie</Button
              >
            </div>
            <p v-if="isOpen === user.id" class="text-sm">{{ user.biography }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
