<template>
  <div class="fixed inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center z-50">
    <div class="fixed inset-0 transition-opacity">
      <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
    </div>
    <div
      class="relative bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-4xl sm:w-full sm:p-6"
    >
      <div class="flex items-center justify-between text-xl font-bold">
        <!-- <div class="flex items-center">
          <img
            class="w-12"
            :src="selectedAsset.image"
          />
          <span class="px-2">
            {{ selectedAsset.name }}
          </span>
        </div> -->

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
      <div class="flex items-center justify-center py-2 text-xl border-b font-bold">
        <!-- <CryptoHistoryForm
          :asset="selectedAsset"
          @asset-history="showAssetHistory"
          @errors="error"
        /> -->
      </div>
      <div class="hidden lg:block mt-4 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th
                class="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              >
                Price
              </th>
              <th
                class="px-6 py-3 bg-gray-50 truncate text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              >
                Volume 24h
              </th>
            </tr>
          </thead>
          <!-- <tbody
            v-if="Object.keys(assetHistory).length"
            class="bg-white divide-y divide-gray-200"
          >
            <tr
              v-for="(market_data, key) in assetHistory.market_data"
              :key="`asset-history-${key}`"
              class="cursor-pointer hover:bg-gray-100"
            >
              <td class="text-center w-1/2 break-all px-1 py-4 text-sm leading-5 text-gray-900">
                {{ formatNumber(Number(market_data.price), getCurrency(market_data.fiat)) }}
              </td>
              <td class="text-center px-6 break-all py-4 text-sm leading-5 text-gray-900">
                {{ formatNumber(Number(market_data.total_volume), getCurrency(market_data.fiat)) }}
              </td>
            </tr>
          </tbody> -->
        </table>
      </div>
      <div class="shadow lg:hidden">
        <!-- <ul class="mt-2 overflow-hidden divide-y divide-gray-200 shadow lg:hidden">
          <li
            v-for="(market_data, key) in assetHistory.market_data"
            :key="`asset-history-${key}`"
          >
            <div class="flex">
              <span class="text-gray-500 w-28">Price: </span>
              <span>{{ formatNumber(Number(market_data.price), getCurrency(market_data.fiat)) }}</span>
            </div>

            <div class="flex">
              <span class=" text-gray-500 text-sm w-28">Volume 24h: </span>
              <span class="">{{ formatNumber(Number(market_data.total_volume), getCurrency(market_data.fiat)) }}</span>
            </div>

          </li>
        </ul> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { Card } from "@/types/Card"
import { formatCurrency } from "@/utils/NumberUtils"
import { getCurrency } from "@/constants/LocaleConstants"

defineProps<{
  selectedCard: Card
}>()

const emit = defineEmits<{
  (e: "close"): void,
  (e: "error", errors: unknown[]): void
}>()

// const cardHistory = ref<CardHistory>({} as CardHistory)

// const showAssetHistory = (history: AssetHistory) => {
//   assetHistory.value = history
// }

const close = () => emit("close")

const error = (errors: unknown[]) => emit("error", errors)

const formatNumber = formatCurrency

</script>

