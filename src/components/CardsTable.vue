<template>
  <div class="flex flex-col bg-gray-300">
    <div class="grid grid-flow-row -my-2 overflow-x-auto auto-rows-max">
      <div class="overflow-hidden border-b border-gray-200 shadow lg:rounded-lg">
        <table class="w-full">
          <tbody class="divide-y divide-gray-200">
            <tr
              v-for="line in Math.ceil(cards.length / TABLE_CONFIG.ITEMS_PER_LINE)"
              :class="`grid grid-cols-2 lg:grid-cols-${TABLE_CONFIG.ITEMS_PER_LINE}`"
              :key="`line-${line}`"
            >
              <td
                v-for="index in (
                  (line * TABLE_CONFIG.ITEMS_PER_LINE) > cards.length ?
                    line * TABLE_CONFIG.ITEMS_PER_LINE - cards.length :
                    TABLE_CONFIG.ITEMS_PER_LINE
                )"
                :key="`card-${getCardIndex(index, line)}`"
                class="px-4 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap cursor-pointer hover:bg-gray-100"
              >
                <div class="h-96"></div>
                {{ getCardIndex(index, line) }}

              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <CardListObserver
      v-if="activeInfiniteScroll"
      @more-data="pushCards"
      @finish-data="activeInfiniteScroll = false"
    />
    <Loading v-show="activeInfiniteScroll" />
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
  (e: "openModal", modalValue: boolean, card: Card, orientation: string): void
  (e: "closeModal", modalValue: boolean, card: Card): void
}>()

const openModal = (card: Card, e: MouseEvent) => {
  const rect = (e.target as HTMLElement).getBoundingClientRect()
  const x = e.clientX
  const orientation = (window.innerWidth / 2) > x ? Orientation.RIGHT : Orientation.LEFT

  setTimeout(() => {
    emit("openModal", true, card, orientation)
  }, 100);
}

const closeModal = () => {
  console.log('fechar modal')
  emit("closeModal", false, {} as Card)
}

const getCardIndex = (index: number, line: number): number => {
  return (index - 1 + (line - 1) * TABLE_CONFIG.ITEMS_PER_LINE)
}
const pushCards = (newCards: Card[]) => {
  cards.push(...newCards)
}

const refreshCards = (newCards: Card[], infiniteScrollState: boolean) => {
  cards.splice(0, cards.length)
  activeInfiniteScroll.value = infiniteScrollState
  pushCards(newCards)
  console.log(cards)
}

defineExpose({ refreshCards })

</script>
