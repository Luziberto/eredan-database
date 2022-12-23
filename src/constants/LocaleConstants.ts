export const PT_BR = "PT_BR"
export const EN_US = "EN_US"
export const ES_ES = "ES_ES"

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
  ALL: string,
  RESULTS: string,
  TOTAL_PAGES: string,
  CURRENT_PAGE: string,
  DRAG_DROP: string,
  DECK_ZONE: string,
  CLEAR : string,
  PRINT : string
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
  REQUIREMENTS = "Requerimentos",
  ALL = "Todos",
  RESULTS = "Resultados",
  TOTAL_PAGES = "Páginas",
  CURRENT_PAGE = "Página Atual",
  DRAG_DROP = "Arrastar e Soltar",
  DECK_ZONE = "Zona de baralho",
  CLEAR = "Limpar",
  PRINT = "Imprimir"
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
  TRAIT = "Traits",
  REQUIREMENTS = "Requirements",
  ALL = "All",
  RESULTS = "Results",
  TOTAL_PAGES = "Total Pages",
  CURRENT_PAGE = "Current Page",
  DRAG_DROP = "Drag and Drop",
  DECK_ZONE = "Deck Zone",
  CLEAR = "Clear",
  PRINT = "Print"
}

export enum ES_ES_TRANSLATE {
  IMG_FOLDER = "es",
  LANGUAGE_ABBREVIATION = "es_es",
  SEARCH = "Búsqueda",
  RARITY = "Rareza",
  EVOLUTION = "Evolución",
  TYPE = "Escribe",
  SERIE = "Serie",
  DESCRIPTION = "Descripción",
  GUILD = "Gremio",
  RACE = "La raza",
  CLASSE = "clase",
  CASTE = "casta",
  TRAIT = "Rasgos",
  REQUIREMENTS = "Requisitos",
  ALL = "Todos",
  RESULTS = "Resultados",
  TOTAL_PAGES = "Paginas Totales",
  CURRENT_PAGE = "Página Actual",
  DRAG_DROP = "Arrastrar y Soltar",
  DECK_ZONE = "Zona de tarjetas",
  CLEAR = "Limpio",
  PRINT = "Imprimir"
}

export function getTranslate(locale: string) : Translate {
  if (locale === EN_US) {
    return EN_US_TRANSLATE
  } if (locale === ES_ES) {
    return ES_ES_TRANSLATE
  } else {
    return PT_BR_TRANSLATE
  }
}
