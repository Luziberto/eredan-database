import { defineStore } from "pinia"
import { Translate, getTranslate, EN_US, EN_US_TRANSLATE } from "@/constants/LocaleConstants"

interface State {
  locale: string,
  translate: Translate
}

export const useLocaleStore = defineStore("locale", {
  state: (): State => ({
    locale: EN_US,
    translate: EN_US_TRANSLATE
  }),
  actions: {
    changeLocale(locale: string) {
      this.locale = locale
      this.translate = getTranslate(locale)
    }
  }
})
