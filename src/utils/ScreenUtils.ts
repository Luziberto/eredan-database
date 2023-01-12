import { TABLE_CONFIG } from "@/constants/TableConstants"
import { SCREEN_SIZE } from "@/constants/ScreenConstants"

interface TableScreenProps {
  itemsPerPage: TABLE_CONFIG
  itemPerLine: TABLE_CONFIG
}

export const getTableScreenProps = (): TableScreenProps => {
  if (window.matchMedia(`(min-width: ${SCREEN_SIZE.XXL})`).matches) {
    return {
      itemsPerPage: TABLE_CONFIG.ITEMS_PER_PAGE_XXL,
      itemPerLine: TABLE_CONFIG.ITEMS_PER_LINE_XXL
    }
  } else if (window.matchMedia(`(min-width: ${SCREEN_SIZE.XL})`).matches) {
    return {
      itemsPerPage: TABLE_CONFIG.ITEMS_PER_PAGE_XL,
      itemPerLine: TABLE_CONFIG.ITEMS_PER_LINE_XL
    }
  } else if (window.matchMedia(`(min-width: ${SCREEN_SIZE.LG})`).matches) {
    return {
      itemsPerPage: TABLE_CONFIG.ITEMS_PER_PAGE_LG,
      itemPerLine: TABLE_CONFIG.ITEMS_PER_LINE_LG
    }
  } else if (window.matchMedia(`(min-width: ${SCREEN_SIZE.MD})`).matches) {
    return {
      itemsPerPage: TABLE_CONFIG.ITEMS_PER_PAGE_MD,
      itemPerLine: TABLE_CONFIG.ITEMS_PER_LINE_MD
    }
  } else {
    return {
      itemsPerPage: TABLE_CONFIG.ITEMS_PER_PAGE_SM,
      itemPerLine: TABLE_CONFIG.ITEMS_PER_LINE_SM
    }
  }
}
