import CardJson from "@/assets/json/cards.json"
import { ASSOCIATIONS } from "@/constants/CardConstants"
import { Card, CardFilters } from "@/types/Card"
import { TranslateContent } from "@/types/Translate"
import { SearchCardResponseData } from "@/types/Card/ResponseData"

class CardDataService {
  getAllCards(page: number, itemsPerPage: number, cards: Array<Card> = (CardJson as Array<Card>)): Array<Card> {
    return cards.slice((page - 1) * (itemsPerPage - 1), page * itemsPerPage)
  }

  searchCards(filters: CardFilters, language: string, { page, itemsPerPage }: {page: number, itemsPerPage: number}): Promise<SearchCardResponseData> {
    return new Promise(resolve => {
        const cards = (CardJson as Array<Card>).filter((card: Card) => {
          return (!filters.term || card.labels[language as keyof TranslateContent].name.toLowerCase().
                  includes(filters.term.toLowerCase())) &&
          this.filterCards(card, filters)
      })
      const totalItems = cards.length
      console.log(`${(page - 1) * itemsPerPage}, ${(page * itemsPerPage - 1)}`)
      resolve({
        cards: cards.slice((page - 1) * itemsPerPage, page * itemsPerPage - 1),
        totalItems,
        totalPages: Math.ceil(totalItems / itemsPerPage)
      })
    })
  }

  private filterCards(card: Card, filters: CardFilters) {
    return (!filters.rarity || (filters.rarity === card.rare_id.toString())) &&
          (!filters.evolution || (filters.evolution === card.evolution.toString())) &&
          (!filters.type || (filters.type === card.type_id.toString())) &&
          (!filters.serie || (filters.serie === card.serie_id.toString())) &&
          (
            !filters.guild || (card.associations.some((association) =>
            association.type_association === ASSOCIATIONS.GUILD && association.associe_id.toString() === filters.guild))
          ) &&
          (
            !filters.race || (card.associations.some((association) =>
            association.type_association === ASSOCIATIONS.RACE && association.associe_id.toString() === filters.race))
          ) &&
          (
            !filters.classe || (card.associations.some((association) =>
            association.type_association === ASSOCIATIONS.CLASSE && association.associe_id.toString() === filters.classe))
          ) &&
          (
            !filters.caste || (card.associations.some((association) =>
            association.type_association === ASSOCIATIONS.CASTE && association.associe_id.toString() === filters.caste))
          )
  }

}

export default new CardDataService
