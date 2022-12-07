import { defineStore } from "pinia"
import { Currency, Translate, getCurrency, getTranslate, PT_BR, PT_BR_CURRENCY, PT_BR_TRANSLATE } from "@/constants/LocaleConstants"

interface State {
  currency: Currency,
  locale: string,
  translate: Translate
}

export const useLocaleStore = defineStore("locale", {
  state: (): State => ({
    locale: PT_BR,
    currency: PT_BR_CURRENCY,
    translate: PT_BR_TRANSLATE
  }),
  actions: {
    changeLocale(locale: string, fiat: string) {
      this.locale = locale
      this.currency = getCurrency(fiat)
      this.translate = getTranslate(locale)
    }
  }
})
