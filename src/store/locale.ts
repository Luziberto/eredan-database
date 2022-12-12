import { defineStore } from "pinia"
import { Translate, getTranslate, PT_BR, PT_BR_TRANSLATE } from "@/constants/LocaleConstants"

interface State {
  locale: string,
  translate: Translate
}

export const useLocaleStore = defineStore("locale", {
  state: (): State => ({
    locale: PT_BR,
    translate: PT_BR_TRANSLATE
  }),
  actions: {
    changeLocale(locale: string) {
      this.locale = locale
      this.translate = getTranslate(locale)
    }
  }
})
