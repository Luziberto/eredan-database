<template>
  <div class="fixed inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center z-50">
    <div class="fixed inset-0 transition-opacity">
      <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
    </div>
    <div
      class="relative bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-xl sm:w-full sm:p-6"
    >
      <div class="flex items-center justify-between text-xl font-bold">
        <span class="px-2 flex-1">
          {{ selectedCard.labels[translate.LANGUAGE_ABBREVIATION as keyof CardLabel].name }}
        </span>

        <button
          class="fill-current h-5 w-5 font-3xl font-bold"
          @click="close"
        >
          <span class="sr-only">Close</span>
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div class="flex items-center justify-center py-2 text-xl border-b font-bold">
        <img :src="`http://static.eredan.com/cards/web_big/${translate.IMG_FOLDER}/${selectedCard.filename}.png`" />
      </div>
      <div class="flex items-center justify-center py-2 text-md border-b">
        <span
          v-html="selectedCard.labels[translate.LANGUAGE_ABBREVIATION as keyof CardLabel].description"
          class=""
        ></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { Card, CardLabel } from "@/types/Card"
import { formatCurrency } from "@/utils/NumberUtils"
import { useLocaleStore } from "@/store/locale"
import { storeToRefs } from "pinia"

const localeStore = useLocaleStore()
const { translate } = storeToRefs(localeStore)

defineProps<{
  selectedCard: Card
}>()

const emit = defineEmits<{
  (e: "close"): void,
  (e: "error", errors: unknown[]): void
}>()

// const cardHistory = ref<CardHistory>({} as CardHistory)

// const showAssetHistory = (history: AssetHistory) => {
//   assetHistory.value = history
// }

const close = () => emit("close")

const error = (errors: unknown[]) => emit("error", errors)

const formatNumber = formatCurrency

</script>

