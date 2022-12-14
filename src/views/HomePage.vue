<template>
  <Alert ref="alert" />

  <nav
    id="nav"
    class="fixed w-full h-48 z-10"
  >
    <div class="flex flex-col lg:py-5 bg-red-700 relative">
      <div class="absolute left-0 top-0 p-2">
        <span class="text-right text-white text-md font-bold">{{ translate.RESULTS }}: {{ qttCards }} </span>
      </div>
      <div class="flex flex-col lg:flex-row justify-between">
        <div class="hidden lg:block w-1/3"></div>
        <div class="flex lg:flex-col justify-center lg:justify-between flex-items-center">

          <div class="lg:hidden block lg:w-1/3"></div>
          <a
            class="flex justify-center"
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

        <div class="flex overflow-clip lg:w-1/3 justify-center lg:justify-end items-center pb-3 lg:m-2">
          <div class="pb-2">
            <label
              for="search"
              class="text-left font-bold text-white text-sm lg:text-md"
            >{{ translate.SEARCH }}</label>
            <input
              v-model="search"
              name="search"
              type="text"
              autocomplete="off"
              class="block w-full py-1 pl-2 pr-10 mt-1 text-sm bg-white font-bold placeholder-gray-400 transition duration-150 ease-in-ou border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-black focus:border-b border-whitelack ring-2"
              @keyup="searchCards()"
            />

          </div>
          <div class="lg:hidden w-1/3 h-10 pt-1 mt-3">
            <LocaleButton :width="20" />
          </div>
        </div>
      </div>

      <div
        ref="dropdown"
        class="flex justify-around dropdown flex-wrap lg:flex-nowrap"
      >
        <TableFilters @filters="searchCards" />
      </div>

      <div
        class="absolute z-20"
        style="left: calc((100% - 6rem)/2); top: calc((100% - 1.25rem) - 0.75rem)"
      >
        <div
          class="relative z-20 w-24 h-12"
          @click="toggleDropdown()"
        >
          <img
            ref="arrow"
            width="12"
            style="left: calc((100% - 1rem)/2); bottom: calc((100% - 2.25rem)/2)"
            class="-rotate-90 absolute z-40 hover:cursor-pointer arrow rotate-up"
            src="/images/right-arrow.png"
          />
          <img
            style="left: calc((100% - 3rem)/2); top: calc((100% - 3rem)/2)"
            width="48"
            class="rotate-90 absolute hover:cursor-pointer z-30"
            src="/images/dropdown-button.png"
          />
        </div>

      </div>
    </div>

  </nav>
  <section class="flex flex-col pt-36">
    <div
      class="background bg-fixed bg-no-repeat"
      style="background-image: url('/background.png')"
    >
      <CardsTable
        ref="cardsTable"
        @open-modal="toggleModal"
        @close-modal="toggleModal"
        @refresh-card-count="refreshCardsCount"
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
      class="hidden lg:block"
      :selected-card="selectedFixedCard"
      :orientation="dialogFixed.orientation"
      @close="dialogFixed.active = false"
    />
  </section>
</template>

<script lang="ts" setup>

import { ref, computed, reactive, onMounted } from "vue"
import { Card, CardFilters } from "@/types/Card"
import CardsTable from "@/components/CardsTable.vue"
import CardDialog from "@/components/CardDialog.vue"
import TableFilters from "@/components/TableFilters.vue"
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
const dropdown = ref<HTMLElement | null>()
const arrow = ref<HTMLElement | null>()

interface DialogOptions {
  active: boolean,
  orientation: Orientation
}

const qttCards = ref<number>(0)

const dialogHover = reactive<DialogOptions>({
  active: false,
  orientation: Orientation.RIGHT
})

const dialogFixed = reactive<DialogOptions>({
  active: false,
  orientation: Orientation.LEFT
})

const defaultFilters: CardFilters = {
  rarity: "",
  evolution: "",
  type: "",
  serie: "",
  guild: "",
  race: "",
  classe: "",
  caste: ""
}

const search = ref<string>("")
const cardsTable = ref<InstanceType<typeof CardsTable> | null>(null)
const alert = ref<InstanceType<typeof Alert> | null>(null)

computed(() => {
  return search.value
})

const searchCards = (filters: CardFilters = defaultFilters) => {
  const canSearch = search.value.length >= 3 || Object.values(filters).some((filter) => filter)
  console.log(canSearch ? 'pode procurar' : 'não pode procurar')
  console.log(filters)
  if (!canSearch) {
    cardsTable.value?.refreshCards([], true)
    return
  }
  delay(async function () {
    if (!canSearch) {
      return
    }

    await CardDataService.searchCards(search.value, translate.value.LANGUAGE_ABBREVIATION, filters).then(response => {
      cardsTable.value?.refreshCards(response.cards, false)
      qttCards.value = response.results
    })
  }, 500)

}

const toggleModal = (modalValue: boolean, card: Card, modalType: ModalType, orientation: Orientation = Orientation.LEFT): void => {

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

const toggleDropdown = (): void => {
  dropdown.value?.classList.toggle("dropdown-animate-visible")
  arrow.value?.classList.toggle("rotate-down")
  arrow.value?.classList.toggle("rotate-up")
}

const backgroundSound = new Audio("http://static.eredan.com/sounds/music_menu.mp3")

const refreshCardsCount = (cardsCount: number) => {
  qttCards.value = cardsCount
}

onMounted(() => {

  delay(async function () {
    backgroundSound.loop = true
    backgroundSound.play()
  }, 5000)

})

</script>

<style scoped>
.background {
  background-position: 0px calc(8rem);
  background-size: 100vw calc(100vh - 8rem);
  min-height: calc(100vh - 8rem);
}


.dropdown.dropdown-animate-visible {
  height: 3.5rem;
  transition: height 0.5s;
}

@media screen and (max-width: 640px) {
  .dropdown.dropdown-animate-visible {
    height: calc(65vh);
    transition: height 0.5s;
  }
}

.dropdown {
  height: 0px;
  overflow: hidden;
  transition: height 0.5s;
}

.arrow.rotate-up {
  transform: rotate(90deg);
  transition: transform 0ms 100ms;
}

.arrow.rotate-down {
  transform: rotate(-90deg);
  transition: transform 0ms 100ms;
}
</style>
