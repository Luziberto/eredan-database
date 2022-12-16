<template>
  <div>
    <Alert ref="alert" />
    <ObserverComponent
      class="h-1"
      @intersect="getData"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue"
import CardDataService from "@/services/CardDataService"
import ObserverComponent from "@/components/ObserverComponent.vue"
import Alert from "@/components/global/AlertPopup.vue"
import { CardFilters } from "@/types/Card"
import { getTableScreenProps } from "@/utils/ScreenUtils"
import { useLocaleStore } from "@/store/locale"
import { storeToRefs } from "pinia"
import { Card } from "@/types/Card"
import PaginationOptions from "@/types/PaginationOptions"

const props = defineProps<{
  filters: CardFilters
}>()

const emit = defineEmits<{
  (e: "moreData", cards: Array<Card>, pageOptions: PaginationOptions): void,
  (e: "finishData"): void
}>()

const localeStore = useLocaleStore()
const { translate } = storeToRefs(localeStore)

const screen = getTableScreenProps()

const paginateOptions: PaginationOptions = ({ page: 1, itemsPerPage: screen.itemsPerPage, totalItems: 0, totalPages: 0 })

const alert = ref<InstanceType<typeof Alert> | null>(null)

const getData = (): void => {


  if (paginateOptions.page !== 1 && paginateOptions.page > paginateOptions.totalPages) {
    return
  }

  CardDataService.searchCards(
    props.filters,
    translate.value.LANGUAGE_ABBREVIATION,
    { page: paginateOptions.page, itemsPerPage: paginateOptions.itemsPerPage }
  ).then((response) => {
    paginateOptions.totalItems = response.totalItems
    paginateOptions.totalPages = response.totalPages
    emit("moreData", response.cards, paginateOptions)
    paginateOptions.page++
  })

}

watch(() => props.filters, () => {
  paginateOptions.page = 1
  paginateOptions.totalItems = 0
  paginateOptions.totalPages = 0
  getData()
}, { deep: true })

defineExpose({ getData })

</script>
