import CardJson from "@/assets/json/cards.json"
import { Card, CardLabel } from "@/types/Card"

class CardDataService {
  getAllCards(page: number, itemsPerPage: number): Array<Card> {
    return (CardJson as Array<Card>).slice((page - 1) * (itemsPerPage - 1), page * itemsPerPage)
  }

  searchCards(term: string, language: string): Promise<Array<Card>> {
    return new Promise(resolve => {
        resolve((CardJson as Array<Card>).filter((card: Card) => {
          return card.labels[language as keyof CardLabel].name.toLowerCase().includes(term.toLowerCase())
      }))
    })
  }
}

export default new CardDataService
