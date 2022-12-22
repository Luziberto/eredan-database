<template>
  <router-view />
</template>

<script lang="ts" setup>
import { onMounted } from "vue"
import { event } from "vue-gtag"

onMounted(() => {
  event("visit", { method: "Google" })
  window.scroll(0, -50)
})

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

