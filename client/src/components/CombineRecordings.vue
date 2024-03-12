<template>
  <div class="combine-recordings">
    <div><button :disabled="!combineAvailable">Combine</button></div>
    <div><button>Play Combined Audio</button></div>
  </div>
</template>

<script setup>
  const props = defineProps({
    combineAvailable: Boolean
  })
</script>