<template>
  <div class="flex flex-col text-start">
    <label
      :for="`${title}-select`"
      class="text-white"
    >{{ title }}</label>
    <select
      :name="`${title}-select`"
      class="p-1 rounded-md bg-white ring appearance-none"
      @change="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >
      <option
        value=""
        selected
      >{{ translate.ALL }}</option>
      <option
        v-for="item in list"
        :key="`${title}-select-item-${item.id}`"
        :value="item.id"
      >{{ item.name }}</option>
    </select>
  </div>

</template>

<script lang="ts" setup>

import { storeToRefs } from "pinia"
import { useLocaleStore } from "@/store/locale"

const localeStore = useLocaleStore()
const { translate } = storeToRefs(localeStore)

defineProps<{
  title: string,
  list: Array<{
    id: number | string,
    name: string
  }>,
  modelValue: number | string | null
}>()

const emit = defineEmits<{
  (e: "update:modelValue", modelValue: string): void
}>()



</script>
