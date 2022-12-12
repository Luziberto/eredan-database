<template>
  <div
    class="flex justify-center w-full"
    role="group"
  >
    <button
      type="button"
      :class="`${locale === PT_BR ? 'bg-orange-700' : 'bg-orange-100'} py-1 px-2 text-sm font-medium text-gray-900 rounded-l border border-gray-200 hover:bg-orange-300 hover:text-blue-700`"
      @click="changeLocale(PT_BR)"
    ><img
        src="/pt_br.svg"
        alt="Português do Brasil"
        :width="width"
        class="rounded-sm"
      ></button>
    <button
      type="button"
      :class="`${locale === EN_US ? 'bg-orange-700' : 'bg-orange-100'} py-1 px-2 text-sm font-medium text-gray-900 rounded-r border border-gray-200 hover:bg-orange-300 hover:text-blue-700`"
      @click="changeLocale(EN_US)"
    ><img
        src="/en_us.svg"
        alt="English"
        :width="width"
        class="rounded-sm"
      >
    </button>
  </div>
</template>

<script lang="ts" setup>
import { PT_BR, EN_US } from "@/constants/LocaleConstants"
import { useLocaleStore } from "@/store/locale"
import { storeToRefs } from "pinia"

const localeStore = useLocaleStore()
const { locale } = storeToRefs(localeStore)

defineProps<{
  width: number
}>()

const changeLocale = (locale: string) => {
  localeStore.changeLocale(locale)
}
</script>

