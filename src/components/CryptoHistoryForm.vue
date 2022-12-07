<template>
  <div class="flex col-span-1 col-start-3 mb-4">
    <div class="flex flex-col ml-4">
      <!-- <label for="date" class="font-bold text-left">Date</label> -->
      <input
        v-model="date"
        name="date"
        type="date"
        min='2015-01-01'
        :max="format(new Date(), 'yyyy-MM-dd')"
        class="block w-full py-2 pl-2 pr-10 mt-1 text-sm font-bold placeholder-gray-400 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-green-500 focus:border-green-500 ring-2"
      />
    </div>
    <button
      class="h-10 bg-green-600 border rounded-md px-2 -py-2 ml-4 mt-auto font-bold text-white hover:bg-green-500">{{
          translate.SEARCH
      }}</button>
    <!-- @click="getAssetHistory()" -->
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue"
import CardDataService from "@/services/CardDataService"
import { Card } from "@/types/Card"
// import { CardHistory } from "@/types/CardHistory"
import { format } from "date-fns"
import { useLocaleStore } from "@/store/locale"
import { storeToRefs } from "pinia"

const localeStore = useLocaleStore()
const { translate } = storeToRefs(localeStore)

const props = defineProps<{
  card: Card
}>()

const emit = defineEmits<{
  // (e: "assetHistory", response: AssetHistory): void,
  (e: "errors", response: unknown[]): void,
}>()

const date = ref<string>(format(new Date(), "yyyy-MM-dd"))

// const getAssetHistory = () => {
//   CardDataService.getAssetHistory(props.card.uuid, date.value).then((response) => {
//     emit("assetHistory", response.data)
//   }).catch((e) => {
//     const messages: unknown[] = Object.values(e.response.data).flat()
//     emit("errors", messages)
//   })
// }
onMounted(() => {
  // getAssetHistory()
})
</script>
