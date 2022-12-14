import { TranslateContent } from "./Translate"

export interface Caste {
  id: number,
  script_slug: string,
  labels: TranslateContent,
  id_parent: number
}
