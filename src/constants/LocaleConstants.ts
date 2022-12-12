export const PT_BR = "PT_BR"
export const EN_US = "EN_US"
export interface Translate {
  IMG_FOLDER: string,
  LANGUAGE_ABBREVIATION: string,
  SEARCH: string,
  RARITY: string,
  EVOLUTION: string,
  TYPE: string,
  SERIE: string,
  DESCRIPTION: string,
  GUILD: string,
  RACE: string,
  CLASSE: string,
  CASTE: string,
  TRAIT: string,
  REQUIREMENTS: string,
}

export enum PT_BR_TRANSLATE {
  IMG_FOLDER = "br",
  LANGUAGE_ABBREVIATION = "pt_br",
  SEARCH = "Buscar",
  RARITY = "Raridade",
  EVOLUTION = "Evolução",
  TYPE = "Tipo",
  SERIE = "Série",
  DESCRIPTION = "Descrição",
  GUILD = "Guilda",
  RACE = "Raça",
  CLASSE = "Classe",
  CASTE = "Caste",
  TRAIT = "Características",
  REQUIREMENTS = "Requerimentos"
}

export enum EN_US_TRANSLATE {
  IMG_FOLDER = "us",
  LANGUAGE_ABBREVIATION = "en_us",
  SEARCH = "Search",
  RARITY = "Rarity",
  EVOLUTION = "Evolution",
  TYPE = "Type",
  SERIE = "Serie",
  DESCRIPTION = "Description",
  GUILD = "Guild",
  RACE = "Race",
  CLASSE = "Classe",
  CASTE = "Casta",
  TRAIT = "Trait",
  REQUIREMENTS = "Requirements"
}

export function getTranslate(locale: string) : Translate {
  if (locale === EN_US) {
    return EN_US_TRANSLATE
  } else {
    return PT_BR_TRANSLATE
  }
}
