<template>
  <div class="flex flex-col">
    <div class="grid grid-flow-row -my-2 overflow-x-auto auto-rows-max">
      <div class="overflow-hidden border-b border-gray-200 shadow lg:rounded-lg">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="min-w-full divide-y divide-gray-200">
          </thead>
          <tbody class="bg-white divide-y divide-gray-200 grid grid-cols-2 lg:grid-cols-7">
            <tr
              v-for="card in cards"
              :key="`card-${card.id}`"
              class="flex justify-between cursor-pointer hover:bg-gray-100"
              @click="openModal(card)"
            >
              <td class="px-4 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap flex-1">
                <div class="flex flex-col items-center justify-center">
                  <img
                    :src="`http://static.eredan.com/cards/web_big/${translate.IMG_FOLDER}/${card.filename}.png`"
                    alt=""
                  >
                  <span
                    className="lg:hidden w-40 pt-2 whitespace-nowrap font-bold text-sm lg:text-lg leading-5 text-gray-900 whitespace-no-wrap truncate"
                  >
                    {{ card.labels[translate.LANGUAGE_ABBREVIATION as keyof CardLabel].name }}
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
          <CardListObserver
            v-if="activeInfiniteScroll"
            @more-data="pushCards"
            @finish-data="activeInfiniteScroll = false"
          />
          <Loading v-show="activeInfiniteScroll" />
        </table>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>

import { Card, CardLabel } from "@/types/Card"
import CardListObserver from "@/components/CardListObserver.vue"
import Loading from "@/components/global/LoadingAnimation.vue"
import { reactive, ref } from "vue"
import { useLocaleStore } from "@/store/locale"
import { storeToRefs } from "pinia"

const cards = reactive<Card[]>([])
const activeInfiniteScroll = ref<boolean>(true)

const localeStore = useLocaleStore()
const { translate } = storeToRefs(localeStore)

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
