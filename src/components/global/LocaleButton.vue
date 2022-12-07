<template>
  <div
    class="flex justify-center w-full"
    role="group"
  >
    <button
      type="button"
      :class="`${locale === PT_BR ? 'bg-neutral-300' : ''} py-1 px-2 text-sm font-medium text-gray-900 bg-white rounded-l border border-gray-200 hover:bg-gray-100 hover:text-blue-700`"
      @click="changeLocale(PT_BR, BRL)"
    ><img
        src="/pt_br.svg"
        alt="English"
        :width="width"
        class="rounded-sm"
      ></button><button
      type="button"
      :class="`${locale === EN_US ? 'bg-neutral-300' : ''} py-0.5 px-2 text-sm font-medium text-gray-900 rounded-r border-l-0 border border-gray-200 hover:bg-gray-100`"
      @click="changeLocale(EN_US, USD)"
    ><img
        src="/en_us.svg"
        alt="Português do Brasil"
        :width="width"
        class="rounded-sm"
      >
    </button>
  </div>
</template>

<script lang="ts" setup>
import { BRL, USD, PT_BR, EN_US } from "@/constants/LocaleConstants"
import { useLocaleStore } from "@/store/locale"
import { storeToRefs } from "pinia"

const localeStore = useLocaleStore()
const { locale } = storeToRefs(localeStore)

defineProps<{
  width: number
}>()

const changeLocale = (locale: string, fiat: string) => {
  localeStore.changeLocale(locale, fiat)
}
</script>

