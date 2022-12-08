export const BRL = "BRL"
export const PT_BR = "PT_BR"
export const USD = "USD"
export const EN_US = "EN_US"

export interface Currency {
  FIAT_SYMBOL: string
  FIAT_NAME: string
  FLOAT_SEPARATOR: string
  THOUSAND_SEPARATOR: string
  LOCALE: string
}

export interface Translate {
  IMG_FOLDER: string,
  LANGUAGE_ABBREVIATION: string,
  SEARCH: string
}

export enum PT_BR_CURRENCY {
  FIAT_SYMBOL = "R$",
  FIAT_NAME = "brl",
  FLOAT_SEPARATOR = ",",
  THOUSAND_SEPARATOR = ".",
  LOCALE = "pt-BR"
}

export enum EN_US_CURRENCY {
  FIAT_SYMBOL = "$",
  FIAT_NAME = "usd",
  FLOAT_SEPARATOR = ",",
  THOUSAND_SEPARATOR = ".",
  LOCALE = "en-US"
}

export enum PT_BR_TRANSLATE {
  IMG_FOLDER = "br",
  LANGUAGE_ABBREVIATION = "pt_br",
  SEARCH = "Buscar"
}

export enum EN_US_TRANSLATE {
  IMG_FOLDER = "us",
  LANGUAGE_ABBREVIATION = "en_us",
  SEARCH = "Search"
}

export function getCurrency(locale: string) : Currency {
  if (locale === USD) {
    return EN_US_CURRENCY
  } else {
    return PT_BR_CURRENCY
  }
}


export function getTranslate(locale: string) : Translate {
  if (locale === EN_US) {
    return EN_US_TRANSLATE
  } else {
    return PT_BR_TRANSLATE
  }
}
