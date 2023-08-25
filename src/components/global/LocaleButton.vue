<template>
  <div
    class="flex justify-center w-full"
    role="group"
  >
    <button
      type="button"
      :class="`${locale === EN_US ? 'bg-red-900' : 'bg-red-100'} py-1 px-2 text-sm font-medium text-gray-900 rounded-r border border-gray-200 hover:bg-red-900 hover:text-blue-700`"
      @click="changeLocale(EN_US)"
    >
      <img
        src="/en_us.svg"
        alt="English"
        :width="width"
        class="rounded-sm"
      />
    </button>

    <button
      type="button"
      :class="`${locale === ES_ES ? 'bg-red-900' : 'bg-red-100'} py-1 px-2 text-sm font-medium text-gray-900 rounded-l rounded-r border border-gray-200 hover:bg-red-900 hover:text-blue-700`"
      @click="changeLocale(ES_ES)"
    >
      <img
        src="/es_es.svg"
        alt="Spañol"
        :width="width"
        class="rounded-sm"
      />
    </button>

    <button
      type="button"
      :class="`${locale === PT_BR ? 'bg-red-900' : 'bg-red-100'} py-1 px-2 text-sm font-medium text-gray-900 rounded-l rounded-r border border-gray-200 hover:bg-red-900 hover:text-blue-700`"
      @click="changeLocale(PT_BR)"
    >
      <img
        src="/pt_br.svg"
        alt="Português do Brasil"
        :width="width"
        class="rounded-sm"
      />
    </button>

    <button
      type="button"
      :class="`${locale === FR_FR ? 'bg-red-900' : 'bg-red-100'} py-1 px-2 text-sm font-medium text-gray-900 rounded-l border border-gray-200 hover:bg-red-900 hover:text-blue-700`"
      @click="changeLocale(FR_FR)"
    >
      <img
        src="/fr_fr.svg"
        alt="Français"
        :width="width"
        class="rounded-sm"
      />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { PT_BR, EN_US, ES_ES, FR_FR } from "@/constants/LocaleConstants"
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

