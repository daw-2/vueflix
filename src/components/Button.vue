<script setup>
defineProps(['loading'])
</script>

<template>
  <button
    class="bg-red-700 py-2 px-4 rounded text-sm hover:bg-red-800 duration-200 text-white disabled:opacity-50"
    :disabled="loading"
  >
    <slot v-if="!loading"></slot>
    <span v-else>Chargement...</span>
  </button>
</template>
