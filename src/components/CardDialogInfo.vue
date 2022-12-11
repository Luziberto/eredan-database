<template>
  <div class="text-md text-start">
    <p class="text-center text-sm border-b py-1">{{ card.serie }}</p>
    <div class="grid grid-cols-2 rounded-md py-2 border-b text-center">
      <span><b>Raridade:</b> <i>{{ card.rarity }}</i></span>
      <span v-if="card.classes.length"><b>Classes:</b> <i>{{ card.classes.join(',') }}</i></span>
      <span v-if="card.races.length"><b>Raças:</b> <i>
          {{ card.races.join(',')
          }}</i></span>
      <span><b>Tipo:</b> <i>{{ card.type
      }}</i></span>
      <div class="col-span-2">
        <p v-if="card.guilds.length"><b>Guildas:</b> <i>{{ card.guilds.join(',') }}</i></p>
      </div>
    </div>



    <div
      v-if="Object.values(card.preReq).flat().length"
      class="col-span-2 py-2 border-b"
    >
      <p class="text-center"><b>Requisitos</b></p>
      <p v-if="card.preReq.classes.length">Classe: {{ card.preReq.classes.join(', ') }}</p>
      <p v-if="card.preReq.races.length">Raça: {{ card.preReq.races.join(', ') }}</p>
      <p v-if="card.preReq.castes.length">Casta: {{ card.preReq.castes.join(', ') }}</p>
      <p v-if="card.preReq.guilds.length">Guilda: {{ card.preReq.guilds.join(', ') }}</p>
    </div>
    <span class="col-span-2">
      <p><b>Descrição</b></p>
      <!-- eslint-disable vue/no-v-html -->
      <span v-html="card.description"></span>
    </span>

  </div>
</template>

<script lang="ts" setup>
import { Card, CardAssociations, CardLabel, CardPrerequis } from "@/types/Card"
import { Rarity } from "@/types/Rarity"
import { Classe } from "@/types/Classe"
import { Guild } from "@/types/Guild"
import { Race } from "@/types/Race"
import { Type } from "@/types/Type"
import { Serie } from "@/types/Serie"
import { Caste } from "@/types/Caste"
import { useLocaleStore } from "@/store/locale"
import { storeToRefs } from "pinia"
import RarityJson from "@/assets/json/rarity.json"
import ClasseJson from "@/assets/json/classes.json"
import GuildJson from "@/assets/json/guild.json"
import RaceJson from "@/assets/json/races.json"
import CasteJson from "@/assets/json/caste.json"
import TypeJson from "@/assets/json/types.json"
import SerieJson from "@/assets/json/series.json"
import { PRE_REQUIS_TYPE, ASSOCIATIONS } from "@/constants/CardConstants"
import { reactive, onMounted } from "vue"

const localeStore = useLocaleStore()
const { translate } = storeToRefs(localeStore)

interface CardRequeriments {
  races: Array<string>,
  castes: Array<string>,
  guilds: Array<string>,
  classes: Array<string>
}

const card = reactive<{
  rarity: string,
  type: string,
  serie: string,
  description: string,
  guilds: Array<string>,
  races: Array<string>,
  classes: Array<string>,
  preReq: CardRequeriments
}>({
  rarity: '',
  guilds: [],
  type: '',
  serie: '',
  description: '',
  races: [],
  classes: [],
  preReq: {
    races: [],
    castes: [],
    guilds: [],
    classes: [],
  }
})

const props = defineProps<{
  selectedCard: Card
}>()

interface Label {
  pt_br: {
    name: string
  },
  en_us: {
    name: string
  }
}

const searchFromJson = (id: number, jsonFile: Array<Rarity | Classe | Guild | Race | Type | Serie | Caste>): Rarity | Classe | Guild | Race | Type | Serie | Caste | undefined => {
  const item = jsonFile.find((item: Rarity | Classe | Guild | Race | Type | Serie | Caste) => {
    return item.id === id
  })
  return item
}

const getJsonByReqType = (type: PRE_REQUIS_TYPE | ASSOCIATIONS): Array<Rarity | Classe | Guild | Race | Type | Serie | Caste> => {
  if (type === PRE_REQUIS_TYPE.CLASSE || type === ASSOCIATIONS.CLASSE) {
    return ClasseJson
  } else if (type === PRE_REQUIS_TYPE.GUILD || type === ASSOCIATIONS.GUILD) {
    return GuildJson
  } else if (type === PRE_REQUIS_TYPE.RACE || type === ASSOCIATIONS.RACE) {
    return RaceJson
  } else {
    return CasteJson
  }
}

const getNameFromJson = (id: number, json: Array<Rarity | Classe | Guild | Race | Type | Serie | Caste>): string => {
  console.log(id)
  return searchFromJson(id, json)?.labels[translate.value.LANGUAGE_ABBREVIATION as keyof Label].name || ''
}

const getAssociationsByType = (associations: Array<CardAssociations>, type: ASSOCIATIONS, json: Array<Guild | Race | Classe | Caste>): Array<string> => {
  const associationMatches = associations.filter((item) => {
    return item.type_association === type
  })

  if (!associationMatches.length) {
    return []
  }

  return associationMatches.map((item) => {
    return getNameFromJson(item.associe_id, json)
  })
}

const getPreReq = (requeriments: Array<CardPrerequis>): CardRequeriments => {
  const requerimentResults: CardRequeriments = {
    races: [],
    castes: [],
    guilds: [],
    classes: [],
  }

  requeriments.forEach((item) => {
    const reqName: string = getNameFromJson(item.target, getJsonByReqType(item.type))

    switch (item.type) {
      case PRE_REQUIS_TYPE.CLASSE:
        requerimentResults.classes.push(reqName)
        break
      case PRE_REQUIS_TYPE.GUILD:
        requerimentResults.guilds.push(reqName)
        break
      case PRE_REQUIS_TYPE.CASTE:
        requerimentResults.castes.push(reqName)
        break
      default:
        requerimentResults.races.push(reqName)
    }
  })

  return requerimentResults
}


onMounted(() => {
  card.rarity = getNameFromJson(props.selectedCard.rare_id, RarityJson)
  card.type = getNameFromJson(props.selectedCard.type_id, TypeJson)
  card.serie = getNameFromJson(props.selectedCard.serie_id, SerieJson)
  card.description = props.selectedCard.labels[translate.value.LANGUAGE_ABBREVIATION as keyof CardLabel].description
  card.guilds = getAssociationsByType(props.selectedCard.associations, ASSOCIATIONS.GUILD, GuildJson)
  card.races = getAssociationsByType(props.selectedCard.associations, ASSOCIATIONS.RACE, RaceJson)
  card.classes = getAssociationsByType(props.selectedCard.associations, ASSOCIATIONS.CLASSE, ClasseJson)
  card.preReq = getPreReq(props.selectedCard.prerequis)
})


</script>

