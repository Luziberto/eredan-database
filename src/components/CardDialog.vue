<template>
  <div
    :class="`card-modal anime dialog ${getOrientationDialogProps(orientation)} overflow-y-auto fixed z-50 bg-red-900 text-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-xl w-3/4 sm:p-6 lg:w-1/5 h-2/3 lg:h-auto`"
  >
    <div class="flex items-center justify-between text-xl font-bold">
      <span class="px-2 flex-1">
        {{ selectedCard.labels[translate.LANGUAGE_ABBREVIATION as keyof CardLabel].name }}
      </span>
      <button
        class="fill-current h-5 w-5 font-3xl font-bold"
        @click="close"
      >
        <span class="sr-only">Close</span>
        <svg
          class="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
    <div class="flex items-center justify-center py-2 text-xl border-b border-white font-bold item-center">
      <img
        class="lg:w-auto"
        :src="`http://static.eredan.com/cards/web_big/${translate.IMG_FOLDER}/${selectedCard.filename}.png`"
      />
    </div>
    <CardDialogInfo :selected-card="selectedCard" />
  </div>
</template>

<script lang="ts" setup>
import { Card, CardLabel } from "@/types/Card"
import { useLocaleStore } from "@/store/locale"
import { storeToRefs } from "pinia"
import { Orientation, getOrientationDialogProps } from "@/constants/ModalConstants"
import CardDialogInfo from "@/components/CardDialogInfo.vue"

const localeStore = useLocaleStore()
const { translate } = storeToRefs(localeStore)

const emit = defineEmits<{
  (e: "close"): void
}>()

defineProps<{
  selectedCard: Card,
  orientation: Orientation
}>()

const close = () => emit("close")

</script>

<style scoped>
@media only screen and (max-width: 600px) {
  .dialog {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.card-modal.anime {
  animation-name: slide;
  animation-duration: .3s;
  animation-fill-mode: forwards;
  animation-timing-function: ease;
  animation-delay: 0s;
  animation-direction: normal;
  animation-play-state: running;
  animation-iteration-count: 1;
  /* animation: slide .3s forwards; */
}

@keyframes slide {
  from {
    opacity: 0;
  }

  to {
    transform: translateX(-50%, -50%);
    opacity: 1;
  }
}
</style>

