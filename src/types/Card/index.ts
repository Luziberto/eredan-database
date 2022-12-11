export interface Card {
  id: string,
  level: number,
  collection_id: number,
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
  all_classes: number,
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
  associations: string,
  prerequis: string,
  hasNextEvo: boolean,
  ancestorCards: string,
  descendantCards: string,
  labels: CardLabel
}
export interface CardLabel {
  pt_br: {
    name: string,
    description: string
  },
  en_us: {
    name: string,
    description: string
  }
}

