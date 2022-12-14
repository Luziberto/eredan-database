import { TranslateContent } from "./Translate"

export interface Type {
  id: number,
  script_slug: string,
  perso: number,
  persistant: number,
  labels: TranslateContent,
  cadre_type: string | null,
  can_be_foil: number,
  use_in_game: number,
  with_xp: number,
  fond_type: string | null,
  id_parent: number
}
