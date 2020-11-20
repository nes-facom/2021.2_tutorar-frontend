/**
 * Retira a mascara dos inputs, funciona apenas se a mascara contem os tokens padrão do v-mask,
 * sendo eles "#", "X", "S", "A", "a", "!"
 */
export function unmask(maskedValue: string, mask: string) {
  if (!maskedValue) return ""

  const tokens = ["#", "X", "S", "A", "a", "!"]
  let valorSemMascara = ""

  for (let i = 0; i < maskedValue.length; i++) {
    // Se o caractere é um token então adicione o caractere do valor mascarado a string final
    if (tokens.includes(mask[i])) valorSemMascara += maskedValue[i]
  }

  return valorSemMascara
}
