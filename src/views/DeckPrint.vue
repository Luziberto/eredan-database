<template>
  <table>
    <tbody class="">
      <tr
        v-for="line in Math.ceil(deck.length / 3)"
        :key="`line-${line}`"
        :class="`grid grid-cols-3`"
      >
        <td
          v-for="index in (
            (line * 3) > deck.length ?
              deck.length - (line - 1) * 3 :
              3
          )"
          :key="`card-${getCardIndex(index, line)}`"
          class="px-4 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap cursor-pointer hover:bg-gray-100"
        >
          <div class="border-1 border-red-900 border-dashed">
            <img
              :src="`http://static.eredan.com/cards/web_big/${imgFolder}/${deck[getCardIndex(index, line)].filename}.png`"
              width="238"
              height="332"
            />
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { Card } from '@/types/Card'

interface CardDeck { card: Card, count: number }

const imgFolder: string = (localStorage.getItem('imgFolder') || 'us')

const deck = ref<Array<Card>>([])

const getCardIndex = (index: number, line: number): number => {
  return (index - 1 + (line - 1) * 3)
}

const loadCards = () => {
  const deckListId: Array<CardDeck> = JSON.parse(localStorage.getItem('cardListId') || '[]')
  const deckCards = deckListId.flatMap((item: CardDeck) => {
    const repeatedCards = []
    for (let index = 0; index < item.count; index++) {
      repeatedCards.push(item.card)
    }
    return repeatedCards
  })


  deck.value.push(...deckCards)
}

onMounted(() => {
  loadCards()
  window.print()
})

</script>

<style scoped>
@media print {
  @page {
    margin-left: 0.5in;
    margin-right: 0.5in;
    margin-top: 0.2in;
    margin-bottom: 0.2in;
  }
}
</style>
