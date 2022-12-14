import { TranslateContent } from "./Translate"

export interface Rarity {
    id: number,
    ordre: number,
    picture: string,
    cadre_perso?: string,
    cadre_autre?: string,
    couleur_texte: string,
    couleur_fond_perso: string,
    icones_par_serie: iconsPerSerie[]
    labels: TranslateContent,
}

export interface iconsPerSerie {
  id_serie: number,
  picture: string
}

