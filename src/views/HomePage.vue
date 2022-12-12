<template>
  <Alert ref="alert" />

  <div class="fixed w-full z-50">
    <nav
      id="nav"
      class="flex flex-col lg:flex-row items-center lg:py-5 justify-between h-32 bg-red-700"
    >
      <div class="hidden lg:block w-1/3"></div>
      <div class="flex lg:flex-col justify-between flex-items-center">

        <div class="lg:hidden block lg:w-1/3"></div>
        <a
          class="flex lg:flex-col justify-center"
          href="https://matias.ma/nsfw"
        >
          <img
            class="w-32"
            src="/logo.png"
            alt=""
          >
        </a>
        <LocaleButton
          :width="20"
          class="hidden lg:block lg:pt-3"
        />
      </div>

      <div class="flex overflow-clip lg:w-1/3 lg:justify-end items-center pb-3 lg:m-2">
        <div class="text-left pb-2">
          <label
            for="search"
            class="font-bold text-white text-sm lg:text-md"
          >{{ translate.SEARCH }}</label>
          <input
            v-model="search"
            name="search"
            type="text"
            autocomplete="off"
            class="block w-full py-1 pl-2 pr-10 mt-1 text-sm bg-white font-bold placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-black focus:border-b border-whitelack ring-2"
            @keyup="searchCards"
          />
        </div>
        <LocaleButton
          :width="20"
          class="lg:hidden w-1/3 h-10 pt-1 mt-3"
        />
      </div>

    </nav>

  </div>
  <section class="flex flex-col pt-32">
    <div
      class="background bg-fixed bg-no-repeat"
      style="background-image: url('/background.png')"
    >
      <CardsTable
        ref="cardsTable"
        @open-modal="toggleModal"
        @close-modal="toggleModal"
      />
    </div>

    <CardDialog
      v-if="dialogHover.active"
      :selected-card="selectedHoverCard"
      :orientation="dialogHover.orientation"
      @close="dialogHover.active = false"
    />

    <CardDialog
      v-if="dialogFixed.active"
      :selected-card="selectedFixedCard"
      :orientation="dialogFixed.orientation"
      @close="dialogFixed.active = false"
    />
  </section>
</template>

<script lang="ts" setup>

import { ref, computed, onMounted, reactive } from "vue"
import { Card } from "@/types/Card"
import CardsTable from "@/components/CardsTable.vue"
import CardDialog from "@/components/CardDialog.vue"
import Alert from "@/components/global/AlertPopup.vue"
import LocaleButton from "@/components/global/LocaleButton.vue"
import { useLocaleStore } from "@/store/locale"
import { storeToRefs } from "pinia"
import CardDataService from "@/services/CardDataService"
import { delay } from "@/utils/Global"
import { ModalType, Orientation } from "@/constants/ModalConstants"

const localeStore = useLocaleStore()
const { translate } = storeToRefs(localeStore)

const selectedHoverCard = ref<Card>({} as Card)
const selectedFixedCard = ref<Card>({} as Card)

interface DialogOptions {
  active: boolean,
  orientation: Orientation
}

const dialogHover = reactive<DialogOptions>({
  active: false,
  orientation: Orientation.RIGHT
})

const dialogFixed = reactive<DialogOptions>({
  active: false,
  orientation: Orientation.LEFT
})

const search = ref<string>("")
const cardsTable = ref<InstanceType<typeof CardsTable> | null>(null)
const alert = ref<InstanceType<typeof Alert> | null>(null)

computed(() => {
  return search.value
})

const searchCards = () => {
  if (search.value.length < 3) {
    cardsTable.value?.refreshCards([], true)
    return
  }
  delay(async function () {
    if (search.value.length < 3) {
      return
    }

    await CardDataService.searchCards(search.value, translate.value.LANGUAGE_ABBREVIATION).then(response => {
      cardsTable.value?.refreshCards(response, false)
    })
  }, 500)

}

const toggleModal = (modalValue: boolean, card: Card, modalType: ModalType, orientation: Orientation = Orientation.LEFT) => {

  if (modalType === ModalType.HOVER) {
    selectedHoverCard.value = card
    dialogHover.orientation = orientation
    if (dialogFixed.active) {
      if (dialogFixed.orientation === Orientation.LEFT) {
        dialogHover.orientation = Orientation.RIGHT
      } else {
        dialogHover.orientation = Orientation.LEFT
      }
    }
    dialogHover.active = modalValue


  } else {
    selectedFixedCard.value = card
    dialogFixed.active = modalValue
    dialogFixed.orientation = orientation
  }


}

onMounted(() => {
  searchCards()
})

</script>

<style scoped>
.background {
  background-position: 0px calc(8rem);
  background-size: 100vw calc(100vh - 8rem);
  min-height: calc(100vh - 8rem);
}
</style>
