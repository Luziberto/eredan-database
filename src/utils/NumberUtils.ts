import { Currency } from "@/constants/LocaleConstants"

export const formatCurrency = (value: number, config: Currency): string => {
  if (isExpNumber(value)) {
    return getExponencialNumber(value, config)
  }
  return convertToCurrency(value, config)
}

export const getExponencialNumber = (value: number, config: Currency): string => {
    const expIndex = value.toString().indexOf("e")
    const zeros = "0".repeat(Number(value.toString().charAt(expIndex + 2)))
    const numberPart = value.toString().substring(0, expIndex).replace(".", "")
    return config.FIAT_SYMBOL + ' ' + zeros.charAt(0) + config.FLOAT_SEPARATOR + zeros.substring(1, expIndex) + numberPart
}

export const isExpNumber = (value: number): boolean => {
  return value.toString().indexOf("e") > 0
}

export const getFloatPointLength = (value: number): number => {
  return value && value.toString().split(".")[1] ? value.toString().split(".")[1].length : 2
}

export const convertToCurrency = (value: number, config: Currency): string => {
  const decimalDigits = getFloatPointLength(value)
  if (decimalDigits > 20) {
    return config.FIAT_SYMBOL + ' ' + value.toString().replace(".", config.FLOAT_SEPARATOR)
  }
  return value.toLocaleString(config.LOCALE, { minimumFractionDigits: decimalDigits, style: "currency", currency: config.FIAT_NAME.toUpperCase() })
}



