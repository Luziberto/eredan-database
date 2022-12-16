import { Card } from ".";

export interface SearchCardResponseData {
  totalItems: number,
  totalPages: number,
  cards: Array<Card>
}
