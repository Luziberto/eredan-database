<template>
  <div class="flex flex-col bg-gray-300">
    <div class="grid grid-flow-row -my-2 overflow-x-auto auto-rows-max">
      <div class="overflow-hidden border-b border-gray-200 shadow lg:rounded-lg">
        <div class="min-w-full divide-y divide-gray-200">
          <div
            :class="`bg-white divide-y divide-gray-200 grid grid-cols-${TABLE_CONFIG.ITEMS_PER_LINE_SM} md:grid-cols-${TABLE_CONFIG.ITEMS_PER_LINE_MD} lg:grid-cols-${TABLE_CONFIG.ITEMS_PER_LINE_LG}`"
          >
            <div
              v-for="card in cards"
              :key="`card-${card.id}`"
              class="flex justify-between cursor-pointer hover:bg-gray-100 col-span-1"
            >
              <div class="px-4 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap flex-1">
                <div
                  class="hidden lg:flex flex-col items-center justify-center"
                  @mouseenter="openModal(card, $event)"
                  @mouseleave="closeModal()"
                >
                  <img
                    :src="`http://static.eredan.com/cards/web_big/${translate.IMG_FOLDER}/${card.filename}.png`"
                    alt=""
                  >
                </div>
                <div
                  class="flex lg:hidden flex-col items-center justify-center"
                  @click="openModal(card, $event)"
                >
                  <img
                    :src="`http://static.eredan.com/cards/web_big/${translate.IMG_FOLDER}/${card.filename}.png`"
                    alt=""
                  >
                  <span
                    className="w-40 pt-2 whitespace-nowrap font-bold text-sm lg:text-lg leading-5 text-gray-900 whitespace-no-wrap truncate"
                  >
                    {{ card.labels[translate.LANGUAGE_ABBREVIATION as keyof CardLabel].name }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <CardListObserver
            v-if="activeInfiniteScroll"
            @more-data="pushCards"
            @finish-data="activeInfiniteScroll = false"
          />
          <Loading v-show="activeInfiniteScroll" />
        </div>
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
import { Orientation } from "@/constants/OrientationConstants"
import { TABLE_CONFIG } from "@/constants/CardConstants"

const cards = reactive<Card[]>([])
const activeInfiniteScroll = ref<boolean>(true)

const localeStore = useLocaleStore()
const { translate } = storeToRefs(localeStore)

const emit = defineEmits<{
  (e: "openModal", modalValue: boolean, card: Card, orientation: Orientation): void
  (e: "closeModal", modalValue: boolean, card: Card): void
}>()

const openModal = (card: Card, e: MouseEvent) => {
  const x = e.clientX
  const orientation = (window.innerWidth / 2) > x ? Orientation.RIGHT : Orientation.LEFT

  setTimeout(() => {
    emit("openModal", true, card, orientation)
  }, 100)
}

const closeModal = () => {
  emit("closeModal", false, {} as Card)
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
