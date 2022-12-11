export interface Guild {
  id: number,
  script_slug: string,
  labels: {
    en_us: {
      name: string,
      description: string
    },
    pt_br: {
      name: string ,
      description: string
    }
  },
  picture: string,
  color: string
}


