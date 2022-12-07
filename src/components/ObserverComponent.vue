<template>
  <div
    ref="root"
    class="observer"
  />
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue"

interface Options { page: number, itemsPerPage: number }

const root = ref<HTMLElement | null>()

defineProps<{
  options: Options
}>()

const observer = new IntersectionObserver(([entry]) => {
  if (entry && entry.isIntersecting) {
    emit("intersect")
  }
})

// const destroyed = () => {
//   observer.disconnect()
// }

const emit = defineEmits<{
  (e: "intersect"): void
}>()

onMounted(() => {
  if (root.value) {
    observer.observe(root.value)
  }
})

</script>
