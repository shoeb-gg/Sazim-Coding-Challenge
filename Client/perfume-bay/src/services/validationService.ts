const textRegex: RegExp = /^.+$/
const emailRegex: RegExp = /^[^@]+@[^@]+\.[^@]+$/
const numberRegex: RegExp = /^\d+(\.\d+)?$/

export const email = (email: string) => {
  if (emailRegex.test(email)) return true
  else return false
}

export const textInput = (text: string | undefined | null): boolean => {
  if (text && textRegex.test(text)) return true
  else return false
}

export const numberInput = (number: number | undefined | null): boolean => {
  if (number && numberRegex.test(number.toString())) return true
  else return false
}

export const textArrayInput = (texts: string[] | undefined | null): boolean => {
  if (texts && texts.length) {
    texts.forEach((element) => {
      if (!element || !textRegex.test(element)) {
        return false
      }
    })
    return true
  } else return false
}
