<template>
  <div class="flex flex-col">
    <div class="grid grid-flow-row -my-2 overflow-x-auto auto-rows-max">
      <div class="overflow-hidden border-b border-gray-200 shadow lg:rounded-lg">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="min-w-full divide-y divide-gray-200">
          </thead>
          <tbody class="bg-white divide-y divide-gray-200 grid lg:grid-cols-5">
            <tr
              v-for="card in cards"
              :key="`card-${card.id}`"
              class="flex justify-between cursor-pointer hover:bg-gray-100"
            >
              <td class="px-4 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap flex-1">
                <div class="flex flex-col items-center justify-center">
                  <img
                    class="w-64"
                    :src="`http://static.eredan.com/cards/web_big/${translate.IMG_FOLDER}/${card.filename}.png`"
                    alt=""
                  >
                  <span
                    class="px-2 w-18 py-4 whitespace-nowrap font-bold text-md lg:text-lg leading-5 text-gray-900 whitespace-no-wrap"
                  >
                    {{ card.name }}
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>

import { Card } from "@/types/Card"
import { formatCurrency } from "@/utils/NumberUtils"
// import CardListObserver from "@/components/CardsListObserver.vue"
// import Loading from "@/components/global/LoadingSpin.vue"
import { ref, reactive } from "vue"
// import { COLOR_TEXT_CLASS } from "@/constants/ColorConstants"
import { useLocaleStore } from "@/store/locale"
import { storeToRefs } from "pinia"
import CardJson from "@/assets/cards.json"

const formatNumber = formatCurrency
const cards = CardJson.slice(0, 19)
// const cards = reactive<Card[]>([])
const activeInfiniteScroll = ref<boolean>(true)

const localeStore = useLocaleStore()
const { currency, translate } = storeToRefs(localeStore)

const emit = defineEmits<{
  (e: "openModal", card: Card): void
}>()

const openModal = (card: Card) => {
  emit("openModal", card)
}

const pushCards = (newCards: Card[]) => {
  cards.push(...newCards)
}

const refreshCards = (newCards: Card[], infiniteScrollState: boolean) => {
  cards.splice(0, cards.length)
  activeInfiniteScroll.value = infiniteScrollState
  pushCards(newCards)
}

defineExpose({ refreshCards })

</script>
