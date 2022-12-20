<template>
  <table>
    <tbody class="">
      <tr
        v-for="line in Math.ceil(deck.length / 3)"
        :key="`line-${line}`"
        :class="`grid grid-cols-3 gap-x-8 m-auto`"
      >
        <td
          v-for="index in (
            (line * 3) > deck.length ?
              line * 3 - deck.length :
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
import CardJson from '@/assets/json/cards.json'
import { Card } from '@/types/Card'

const cardIds: Array<string> = (localStorage.getItem('cardListId') || '').split(',')
const imgFolder: string = (localStorage.getItem('imgFolder') || 'us')

const deck = ref<Array<Card>>([])

const getCardIndex = (index: number, line: number): number => {
  return (index - 1 + (line - 1) * 3)
}

const loadCards = () => {
  const cards: Array<Card> = []
  CardJson.forEach((card: Card) => {
    if (cardIds.includes(card.id.toString())) {
      cardIds.forEach((item) => {
        if (item === card.id.toString()) {
          cards.push(card)
        }
      })
    }
  })
  deck.value.push(...cards)
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
    margin-top: 0;
    margin-bottom: 0;
  }
}
</style>
