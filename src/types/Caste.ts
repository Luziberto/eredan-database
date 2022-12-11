export interface Caste {
  id: number,
  script_slug: string,
  labels: {
    en_us: {
      name: string
    },
    pt_br: {
      name: string
    }
  },
  id_parent: number

}
