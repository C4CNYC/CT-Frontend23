/* with the variety of different languages
and currencies, it's not always easy to detect
a zero amount. This regex will detect an amount
of 0.00, $0.00,  0.00TRY, or AUD0.00  . */

export function detectZeroAmount(value: string): boolean {
  const regex = /^(?:[^0-9]{0,3}|\$|₺)?\s*0\.00\s*(?:[^0-9]{0,3}|\$|₺)?$/
  return regex.test(value)
}
