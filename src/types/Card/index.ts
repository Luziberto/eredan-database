import { PRE_REQUIS_TYPE, ASSOCIATIONS } from "@/constants/CardConstants"
import { TranslateContent } from "../Translate"

export interface Card {
  id: string,
  level: number,
  serie_id: number,
  type_id: number,
  rare_id: number,
  evolution: number,
  duree: number,
  properties: string,
  script_slug: string,
  filename: string,
  model_id: number,
  card_id: string,
  sex: string,
  life: number,
  base_attack: number,
  high_attack: number,
  defense: number,
  spirit: number,
  all_classes: [],
  max_runes: number,
  personal: number,
  persistent: number,
  nb_slot: number,
  id_reedition: string,
  illustration: string,
  illustration_illustrator: string,
  background: string,
  background_illustrator: string,
  frame_type: string,
  background_type: number,
  associations: Array<CardAssociations>,
  prerequis: Array<CardPrerequis>,
  hasNextEvo: boolean,
  ancestorCards: string,
  descendantCards: string,
  labels: TranslateContent
}

export interface CardPrerequis {
  type: PRE_REQUIS_TYPE,
  target: number,
  value: number,
  type_comparaison: string
}

export interface CardAssociations {
  type_association: ASSOCIATIONS,
  associe_id: number
}

export interface CardFilters {
  rarity: number | string,
  evolution: number | string,
  type: number | string,
  serie: number | string,
  guild: number | string,
  race: number | string,
  classe: number | string,
  caste: number | string
}
