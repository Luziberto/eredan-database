<template>
  <div class="flex flex-col">
    <Alert ref="alert" />
    <LocaleButton :width="20" />
    <div class="flex md:grid md:grid-cols-12">
      <div class="flex flex-1 md:col-start-11 md:col-end-13 m-2">
        <div class="text-left pb-2 w-full">
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
      </div>
    </div>

    <CardsTable
      ref="cardsTable"
      @open-modal="openModal"
    />
    <CardDetailsDialog
      v-if="dialog"
      :selected-card="selectedCard"
      @close="dialog = false"
      @error="error"
    />
  </div>
</template>

<script lang="ts" setup>

import { ref, computed, onMounted } from "vue"
import { Card } from "@/types/Card"
import CardsTable from "@/components/CardsTable.vue"
import CardDetailsDialog from "@/components/CardDetailsDialog.vue"
import { ALERT_TYPES } from "@/constants/AlertConstants"
import Alert from "@/components/global/AlertPopup.vue"
import LocaleButton from "@/components/global/LocaleButton.vue"
import { useLocaleStore } from "@/store/locale"
import { storeToRefs } from "pinia"
import CardDataService from "@/services/CardDataService"

const localeStore = useLocaleStore()
const { translate } = storeToRefs(localeStore)

const selectedCard = ref<Card>({
  // uuid: "",
  // name: "",
  // slug: "",
  // symbol: "",
  // price_brl: "0",
  // price_usd: "0",
  // image: ""
} as Card)

const dialog = ref<boolean>(false)
const search = ref<string>("")
const cardsTable = ref<InstanceType<typeof CardsTable> | null>(null)
const alert = ref<InstanceType<typeof Alert> | null>(null)

computed(() => {
  return search.value
})

const searchCards = () => {
  if (search.value.length === 0) {
    cardsTable.value?.refreshCards([], true)
    return
  }
  const responseData = CardDataService.searchCards(search.value, translate.value.LANGUAGE_ABBREVIATION)
  setTimeout(() => {
    cardsTable.value?.refreshCards(responseData, false)
  }, 1000)

}

const openModal = (card: Card) => {
  selectedCard.value = card
  dialog.value = true
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
