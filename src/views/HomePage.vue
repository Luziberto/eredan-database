<template>
  <Alert ref="alert" />

  <div class="fixed w-full z-50 bg-gray-300">
    <div
      id="nav"
      class="flex flex-col lg:flex-row items-center bg-white lg:py-5 justify-between h-28"
    >
      <div class="hidden lg:block w-1/3"></div>
      <div class="flex lg:flex-col justify-between flex-items-center">

        <div class="lg:hidden block w-1/3"></div>
        <a
          class="flex lg:flex-col justify-center"
          href="https://matias.ma/nsfw"
        >
          <img
            class="w-32"
            src="@/assets/image/2_Preloader_logo.png"
            alt=""
          >
        </a>
        <LocaleButton
          :width="20"
          class="hidden lg:block"
        />
      </div>

      <div class="flex lg:w-1/3 lg:justify-end items-center lg:m-2">
        <div class="text-left pb-2">
          <label
            for="search"
            class="font-bold"
          >{{ translate.SEARCH }}</label>
          <input
            v-model="search"
            name="search"
            type="text"
            class="block w-full py-1 pl-2 pr-10 mt-1 text-sm font-bold placeholder-gray-400 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-green-500 focus:border-green-500 ring-2"
            @keyup="searchCards"
          />
        </div>
        <LocaleButton
          :width="20"
          class="lg:hidden w-1/3 h-10 pt-1 mt-3"
        />
      </div>

    </div>

  </div>
  <div class="flex flex-col bg-gray-300 pt-28">
    <CardsTable
      ref="cardsTable"
      @open-modal="toggleModal"
      @close-modal="toggleModal"
    />
    <CardDialog
      v-if="dialog.active"
      :selected-card="selectedCard"
      :orientation="dialog.orientation"
      @close="dialog.active = false"
    />
  </div>
</template>

<script lang="ts" setup>

import { ref, computed, onMounted, reactive } from "vue"
import { Card } from "@/types/Card"
import CardsTable from "@/components/CardsTable.vue"
import CardDialog from "@/components/CardDialog.vue"
import { ALERT_TYPES } from "@/constants/AlertConstants"
import Alert from "@/components/global/AlertPopup.vue"
import LocaleButton from "@/components/global/LocaleButton.vue"
import { useLocaleStore } from "@/store/locale"
import { storeToRefs } from "pinia"
import CardDataService from "@/services/CardDataService"
import { delay } from "@/utils/Global"
import { Orientation } from "@/constants/OrientationConstants"

const localeStore = useLocaleStore()
const { translate } = storeToRefs(localeStore)

const selectedCard = ref<Card>({} as Card)

const dialog = reactive<{
  active: boolean,
  orientation: Orientation
}>({
  active: false,
  orientation: Orientation.RIGHT
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

const toggleModal = (modalValue: boolean, card: Card, orientation: Orientation = Orientation.LEFT) => {
  selectedCard.value = card
  dialog.active = modalValue
  dialog.orientation = orientation
}

const error = (errors: unknown[]) => {
  alert.value?.show(errors.map(String), ALERT_TYPES.ERROR)
}

onMounted(() => {
  searchCards()
})

</script>

<style scoped>
.main-container {
  height: 650px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
