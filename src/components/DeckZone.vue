<template>
  <div
    class="flex flex-col lg:py-5 bg-red-700 relative"
    @drop="onDrop($event)"
    @dragenter.prevent
    @dragover.prevent
  >
    <div class="absolute top-0 right-0 mt-1 mr-1">
      <button
        class="py-1 px-2 bg-gray-800 rounded-md hover:bg-gray-600 mr-1"
        @click="clearDeckList"
      >
        <span class="text-white font-bold">
          Clear
        </span>
      </button>

      <a
        href="/print"
        target="_blank"
      >
        <button
          class="py-1 px-2 bg-blue-800 rounded-md hover:bg-blue-600"
          @click="saveDeckList(); saveLocale()"
        >
          <span class="text-white font-bold">
            Save & Print
          </span>
        </button>
      </a>
    </div>
    <div
      id="deckDropDown"
      ref="dropdown"
      class="dropdown"
    >
      <div class="h-32 border-2 border-dashed mx-2">
        <ul class="flex justify-center items-center h-full">


          <p
            v-show="
            !deck.length"
            class="text-white font-bold text-2xl"
          >Deck Zone</p>
          <li
            v-for="[key, item] in deckFormatted"
            :key="`deck-card-${key}`"
            @startDrag="startDrag($event, item.card)"
          >
            <div class="relative">
              <img
                :src="`http://static.eredan.com/cards/web_small/${translate.IMG_FOLDER}/${item.card.filename}.png`"
                class="cursor-pointer"
                @mouseleave="closeModal(ModalType.HOVER, $event)"
                @click="openModal(item.card, ModalType.FIXED, $event); clickSound.play()"
                @mouseenter="openModal(item.card, ModalType.HOVER, $event); hoverSound.play()"
              />
              <b class="absolute top-0 right-0 text-white">
                {{ item.count }}x
              </b>
            </div>


          </li>
        </ul>
      </div>


    </div>


    <div
      class="absolute z-20"
      style="left: calc((100% - 6rem)/2); bottom: calc((100% - 1.25rem) - 1.25rem)"
    >
      <div
        class="relative z-20 w-24 h-12"
        @click="toggleDropdown()"
      >
        <img
          ref="arrow"
          width="12"
          style="left: calc((100% - 1rem)/2); top: calc((100% - 2.25rem)/2)"
          class="absolute z-40 hover:cursor-pointer arrow rotate-down"
          src="/icons/right-arrow.png"
        />
        <img
          style="left: calc((100% - 3rem)/2); bottom: calc((100% - 3rem)/2)"
          width="48"
          class="-rotate-90 absolute hover:cursor-pointer z-30"
          src="/images/dropdown-button.png"
        />
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { Card } from "@/types/Card"
import { ref, computed, onMounted } from "vue"
import { storeToRefs } from "pinia"
import { useLocaleStore } from "@/store/locale"
import CardJson from "@/assets/json/cards.json"
import { ModalType, Orientation } from "@/constants/ModalConstants"

const localeStore = useLocaleStore()
const { translate } = storeToRefs(localeStore)

const dropdown = ref<HTMLElement | null>()
const arrow = ref<HTMLElement | null>()

const deck = ref<Array<Card>>([])
const hoverSound = new Audio("http://static.eredan.com/sounds/general/survol_carte.mp3")
const clickSound = new Audio("http://static.eredan.com/sounds/dock_menu/dock_clic.mp3")

const emit = defineEmits<{
  (e: "openModal", modalValue: boolean, card: Card, modalType: ModalType, orientation: Orientation): void
  (e: "closeModal", modalValue: boolean, card: Card, modalType: ModalType,): void
}>()

const toggleDropdown = (): void => {
  dropdown.value?.classList.toggle("dropdown-animate-visible")
  arrow.value?.classList.toggle("rotate-down")
  arrow.value?.classList.toggle("rotate-up")
}

const startDrag = (event: DragEvent, card: Card) => {
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = "move"
    event.dataTransfer.effectAllowed = "move"
    event.dataTransfer.setData("itemId", card.id.toString())
  }
}

const onDrop = (event: DragEvent) => {
  if (event.dataTransfer) {
    const itemId = event.dataTransfer.getData("itemId")
    const card = CardJson.find((card: Card) => card.id === Number(itemId))
    deck.value.push(card)
  }
  saveDeckList()
}

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

const deckFormatted = computed<Map<number, { card: Card, count: number }>>(() => {
  const uniqueCards = new Map()

  deck.value.forEach((card: Card) => {
    uniqueCards.set(card.id, {
      card,
      count: (uniqueCards.get(card.id)?.count || 0) + 1
    })
  })
  return uniqueCards
})

const clearDeckList = () => {
  deck.value = []
  localStorage.removeItem('cardListId')
}

const saveDeckList = () => {
  localStorage.setItem('cardListId', deck.value.map(item => item.id).join(','))
}

const loadDeckList = () => {
  const deckListId = (localStorage.getItem('cardListId') || '').split(',')
  const cards: Array<Card> = []
  CardJson.forEach((card: Card) => {
    if (deckListId.includes(card.id.toString())) {
      deckListId.forEach((item) => {
        if (item === card.id.toString()) {
          cards.push(card)
        }
      })
    }
  })
  deck.value.push(...cards)
}

const saveLocale = () => {
  localStorage.setItem('imgFolder', translate.value.IMG_FOLDER)
}

onMounted(() => {
  const dropdown = document?.getElementById("deckDropDown")
  if (dropdown) {
    dropdown.style.setProperty("--calc-height", `${(dropdown.clientHeight + 5).toString()}px`)
    dropdown.style.setProperty("--initial-height", "0px")
  }
  loadDeckList()
})

</script>

<style scoped>
.background {
  background-position: 0px calc(8rem);
  background-size: 100vw calc(100vh - 8rem);
  min-height: calc(100vh - 8rem);
}


.dropdown.dropdown-animate-visible {
  height: var(--calc-height);
  transition: height 0.5s;
}

.dropdown {
  height: var(--initial-height);
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