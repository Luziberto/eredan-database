<template>
  <SelectInput
    v-model="filterValues.classe"
    class="w-full px-2"
    :title="translate.CLASSE"
    :list="formatItems(ClasseJson)"
  />
  <SelectInput
    v-model="filterValues.guild"
    class="w-full px-2"
    :title="translate.GUILD"
    :list="formatItems(GuildJson)"
  />
  <SelectInput
    v-model="filterValues.race"
    class="w-full px-2"
    :title="translate.RACE"
    :list="formatItems(RaceJson)"
  />
  <SelectInput
    v-model="filterValues.type"
    class="w-full px-2"
    :title="translate.TYPE"
    :list="formatItems(TypeJson)"
  />
  <SelectInput
    v-model="filterValues.rarity"
    class="w-full px-2"
    :title="translate.RARITY"
    :list="formatItems(RarityJson)"
  />
  <SelectInput
    v-model="filterValues.caste"
    class="w-full px-2"
    :title="translate.CASTE"
    :list="formatItems(CasteJson)"
  />
  <SelectInput
    v-model="filterValues.serie"
    class="w-full px-2"
    :title="translate.SERIE"
    :list="formatItems(SerieJson)"
  />
  <SelectInput
    v-model="filterValues.evolution"
    class="w-full px-2"
    :title="translate.EVOLUTION"
    :list="[
      {
        id: GRADE_LABEL[translate.LANGUAGE_ABBREVIATION as keyof GradeLabel][GRADE_NOVICE as keyof Grade],
        name: GRADE_LABEL[translate.LANGUAGE_ABBREVIATION as keyof GradeLabel][GRADE_NOVICE as keyof Grade]
      },
      {
        id: GRADE_LABEL[translate.LANGUAGE_ABBREVIATION as keyof GradeLabel][GRADE_ADVENTURE as keyof Grade],
        name: GRADE_LABEL[translate.LANGUAGE_ABBREVIATION as keyof GradeLabel][GRADE_ADVENTURE as keyof Grade]
      },
      {
        id: GRADE_LABEL[translate.LANGUAGE_ABBREVIATION as keyof GradeLabel][GRADE_CHAMPION as keyof Grade],
        name: GRADE_LABEL[translate.LANGUAGE_ABBREVIATION as keyof GradeLabel][GRADE_CHAMPION as keyof Grade]
      },
      {
        id: GRADE_LABEL[translate.LANGUAGE_ABBREVIATION as keyof GradeLabel][GRADE_GORVERNOR as keyof Grade],
        name: GRADE_LABEL[translate.LANGUAGE_ABBREVIATION as keyof GradeLabel][GRADE_GORVERNOR as keyof Grade]
      }
    ]"
  />


</template>

<script lang="ts" setup>
import { Rarity } from "@/types/Rarity"
import { Race } from "@/types/Race"
import { Type } from "@/types/Type"
import { Serie } from "@/types/Serie"
import { Caste } from "@/types/Caste"
import { useLocaleStore } from "@/store/locale"
import { storeToRefs } from "pinia"
import ClasseJson from "@/assets/json/classes.json"
import { TranslateContent } from "@/types/Translate"
import SelectInput from "./global/SelectInput.vue"
import { Classe } from "@/types/Classe"
import GuildJson from "@/assets/json/guild.json"
import RaceJson from "@/assets/json/races.json"
import TypeJson from "@/assets/json/types.json"
import RarityJson from "@/assets/json/rarity.json"
import { Guild } from "@/types/Guild"
import { Grade, GradeLabel, GRADE_NOVICE, GRADE_LABEL, GRADE_ADVENTURE, GRADE_CHAMPION, GRADE_GORVERNOR } from "@/constants/GradeConstants"
import CasteJson from "@/assets/json/caste.json"
import SerieJson from "@/assets/json/series.json"
import { reactive, watchEffect, onMounted } from "vue"
import { CardFilters } from "@/types/Card"

const localeStore = useLocaleStore()
const { translate } = storeToRefs(localeStore)

interface SelectParams {
  id: number | string,
  name: string
}

const emit = defineEmits<{
  (e: "updateFilters", filters: CardFilters): void
}>()

const filterValues = reactive<CardFilters>({
  rarity: "",
  evolution: "",
  type: "",
  serie: "",
  guild: "",
  race: "",
  classe: "",
  caste: ""
})

const formatItems = (items: Array<Classe | Guild | Rarity | Race | Type | Serie | Caste>): Array<SelectParams> => {
  return items.map((item) => {
    return {
      id: item.id,
      name: item.labels[translate.value.LANGUAGE_ABBREVIATION as keyof TranslateContent].name || ''
    }
  })

}
onMounted(() => {
  watchEffect(() => {
    emit("updateFilters", filterValues)
  })
})
</script>

