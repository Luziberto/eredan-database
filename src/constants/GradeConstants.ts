export const GRADE_NOVICE = 1
export const GRADE_ADVENTURE = 2
export const GRADE_CHAMPION = 3
export const GRADE_GORVERNOR = 4

export const GRADE_LABEL: GradeLabel = {
  pt_br: {
    [GRADE_GORVERNOR]: 'Governador',
    [GRADE_CHAMPION]: 'Campeão',
    [GRADE_ADVENTURE]: 'Aventureiro',
    [GRADE_NOVICE]: 'Iniciante'
  },
  en_us: {
    [GRADE_GORVERNOR]: 'Governor',
    [GRADE_CHAMPION]: 'Champion',
    [GRADE_ADVENTURE]: 'Adventure',
    [GRADE_NOVICE]: 'Novice'
  },
  es_es: {
    [GRADE_GORVERNOR]: 'Gobernador',
    [GRADE_CHAMPION]: 'Campeón',
    [GRADE_ADVENTURE]: 'Aventura',
    [GRADE_NOVICE]: 'Principiante'
  }
}

export interface Grade {
  [GRADE_GORVERNOR]: string,
  [GRADE_CHAMPION]: string,
  [GRADE_ADVENTURE]: string,
  [GRADE_NOVICE]: string
}
export interface GradeLabel {
  pt_br: Grade,
  en_us: Grade,
  es_es: Grade
}

export enum GRADE_COLOR {
  GRADE_NOVICE = '#ffffff',
  GRADE_ADVENTURE = '#ffffff',
  GRADE_GORVERNOR = '#ff7f00',
  GRADE_CHAMPION = '#e21113'
}



