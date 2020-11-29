/**
 * Retira a mascara dos inputs, funciona apenas se a mascara contem os tokens padrão do v-mask,
 * sendo eles "#", "X", "S", "A", "a", "!"
 *
 * exemplo: valor: '(12) 34-56', mascara: '(##) ##-##' -> '123456'
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

export function getApropriateTelefoneMask(telefone?: string): string {
  if (!telefone) return ""
  if (telefone.length <= 8) return "####-####"
  if (telefone.length === 9) return "#####-####"
  if (telefone.length === 10) return "(##) ####-####"
  if (telefone.length === 11) return "(##) #####-####"
  return "+## (##) #####-####"
}
