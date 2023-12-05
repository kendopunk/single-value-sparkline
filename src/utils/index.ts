/**
 * src/utils/index.ts
 * Non-React utility functions
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isNumeric(val: any): boolean {
  return !isNaN(Number(val))
}

export const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

/**
 * Check to see if a value is a parseable date
 * @param d
 * @returns
 */
export function isParseableDate(d: string | number | null): boolean {
  if (d === null) {
    return false
  }

  const test = Date.parse(d + '')
  return isNaN(test) === false
}

export function parseableDateToTimestamp(d: string | number | null): number | null {
  if (d === null) {
    return null
  }

  if (isParseableDate(d)) {
    return Date.parse(d + '')
  }
  return parseInt(d + '')
}
