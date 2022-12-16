<template>
  <div class="flex flex-col">
    <div class="grid grid-flow-row -my-2 overflow-x-auto auto-rows-max">
      <div class="overflow-hidden lg:rounded-lg">
        <div class="min-w-full">
          <div class="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12">
            <div
              v-for="card in cards"
              :key="`card-${card.id}`"
              class="flex justify-between cursor-pointer hover:opacity-50 col-span-1"
            >
              <div class="px-4 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap flex-1">
                <div
                  class="hidden lg:flex flex-col items-center justify-center"
                  @mouseenter="openModal(card, ModalType.HOVER, $event); hoverSound.play()"
                  @mouseleave="closeModal(ModalType.HOVER, $event)"
                  @click="openModal(card, ModalType.FIXED, $event); clickSound.play()"
                >
                  <img
                    :src="`http://static.eredan.com/cards/web_mid/${translate.IMG_FOLDER}/${card.filename}.png`"
                    alt=""
                  >
                </div>
                <div
                  class="flex lg:hidden flex-col items-center justify-center"
                  @click="openModal(card, ModalType.HOVER, $event)"
                >
                  <img
                    :src="`http://static.eredan.com/cards/web_mid/${translate.IMG_FOLDER}/${card.filename}.png`"
                    alt=""
                  >
                  <span
                    className="w-40 pt-2 whitespace-nowrap font-bold text-sm lg:text-lg leading-5 text-white whitespace-no-wrap truncate"
                  >
                    {{ card.labels[translate.LANGUAGE_ABBREVIATION as keyof TranslateContent].name }}
                  </span>
                </div>
              </div>
            </div>
            <CardListObserver
              ref="cardListObserver"
              :filters="filters"
              @more-data="refreshCards"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { Card, CardFilters } from "@/types/Card"
import PaginationOptions from "@/types/PaginationOptions"
import CardListObserver from "@/components/CardListObserver.vue"
import { reactive, ref, watch } from "vue"
import { useLocaleStore } from "@/store/locale"
import { storeToRefs } from "pinia"
import { Orientation, ModalType } from "@/constants/ModalConstants"
import { TranslateContent } from "@/types/Translate"

const props = defineProps<{
  filters: CardFilters
}>()

const emit = defineEmits<{
  (e: "openModal", modalValue: boolean, card: Card, modalType: ModalType, orientation: Orientation): void
  (e: "closeModal", modalValue: boolean, card: Card, modalType: ModalType,): void
  (e: "refreshOptions", options: PaginationOptions): void
}>()

const cards = reactive<Card[]>([])
const cardListObserver = ref<InstanceType<typeof CardListObserver> | null>(null)

const localeStore = useLocaleStore()
const { translate } = storeToRefs(localeStore)


const openModal = (card: Card, modalType: ModalType, e: MouseEvent) => {
  const x = e.clientX
  let orientation = Orientation.RIGHT

  if ((window.innerWidth / 2) > x) {
    orientation = modalType === ModalType.HOVER ? Orientation.RIGHT : Orientation.LEFT
  } else {
    orientation = modalType === ModalType.HOVER ? Orientation.LEFT : Orientation.RIGHT
  }

  setTimeout(() => {
    emit("openModal", true, card, modalType, orientation)
  }, 100)
}

const closeModal = (modalType: ModalType, e: MouseEvent) => {
  if (!(e.relatedTarget as HTMLElement)?.classList?.contains('card-modal')) {
    emit("closeModal", false, {} as Card, modalType)
  }
}

const pushCards = (newCards: Card[]) => {
  cards.push(...newCards)
}

const refreshCards = (newCards: Card[], options: PaginationOptions) => {
  // cards.splice(0, cards.length)
  // activeInfiniteScroll.value = infiniteScrollState
  pushCards(newCards)
  emit("refreshOptions", options)
}

watch(() => props.filters, () => {
  cards.splice(0, cards.length)

}, { deep: true })


const hoverSound = new Audio("http://static.eredan.com/sounds/general/survol_carte.mp3")
const clickSound = new Audio("http://static.eredan.com/sounds/dock_menu/dock_clic.mp3")

defineExpose({ refreshCards })

</script>

