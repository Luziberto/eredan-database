<template>
  <div>
    <Alert ref="alert" />
    <ObserverComponent
      :options="options"
      @intersect="getData"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue"
import CardDataService from "@/services/CardDataService"
import ObserverComponent from "@/components/ObserverComponent.vue"
import Alert from "@/components/global/AlertPopup.vue"
import { Card } from "@/types/Card"
import { getTableScreenProps } from "@/utils/ScreenUtils"
import CardJson from "@/assets/json/cards.json"

interface Options { page: number, itemsPerPage: number }

const screen = getTableScreenProps()

const options = reactive<Options>({ page: 1, itemsPerPage: screen.itemsPerPage })
const alert = ref<InstanceType<typeof Alert> | null>(null)

const getData = (): void => {
  const start = (options.page - 1) * options.itemsPerPage
  const end = options.page * options.itemsPerPage
  const items = CardJson.slice(start, end)

  if (!items.length) {
    emit("finishData")
    return
  }

  const responseData = CardDataService.getAllCards(options.page, options.itemsPerPage)
  emit("moreData", responseData)
  options.page++
  options.itemsPerPage++

}

const emit = defineEmits<{
  (e: "moreData", assets: Card[]): void
  (e: "finishData"): void
}>()

</script>
