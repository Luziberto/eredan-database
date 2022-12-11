import { TABLE_CONFIG } from "@/constants/CardConstants"
import { SCREEN_SIZE } from "@/constants/ScreenConstants"

interface TableScreenProps {
  itemsPerPage: TABLE_CONFIG
  itemPerLine: TABLE_CONFIG
}

export const getTableScreenProps = (): TableScreenProps => {
  if (window.matchMedia(`(max-width: ${SCREEN_SIZE.SM}px)`).matches) {
    return {
      itemsPerPage: TABLE_CONFIG.ITEMS_PER_PAGE_SM,
      itemPerLine: TABLE_CONFIG.ITEMS_PER_LINE_SM
    }
  }
  else if (window.matchMedia(`(max-width: ${SCREEN_SIZE.MD}px)`).matches) {
    return {
      itemsPerPage: TABLE_CONFIG.ITEMS_PER_PAGE_MD,
      itemPerLine: TABLE_CONFIG.ITEMS_PER_LINE_MD
    }
  } else if (window.matchMedia(`(max-width: ${SCREEN_SIZE.LG}px)`).matches) {
    return {
      itemsPerPage: TABLE_CONFIG.ITEMS_PER_PAGE_LG,
      itemPerLine: TABLE_CONFIG.ITEMS_PER_LINE_LG
    }
  } else if (window.matchMedia(`(max-width: ${SCREEN_SIZE.XL}px)`).matches) {
    return {
      itemsPerPage: TABLE_CONFIG.ITEMS_PER_PAGE_XL,
      itemPerLine: TABLE_CONFIG.ITEMS_PER_LINE_XL
    }
  } else {
    return {
      itemsPerPage: TABLE_CONFIG.ITEMS_PER_PAGE_2XL,
      itemPerLine: TABLE_CONFIG.ITEMS_PER_LINE_2XL
    }
  }

}
