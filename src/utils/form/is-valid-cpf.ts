/**
 * Valida um cpf, detalhes da implementação ver
 * https://www.devmedia.com.br/validar-cpf-com-javascript/23916
 *
 * @param cpf
 */
export default (cpf: string) => {
  cpf = cpf.replace(/[^0-9a-z]/gi, "")

  // Elimina inválidos com todos os caracteres iguais
  if (/^(\d)\1+$/.test(cpf)) return false

  let soma = 0

  for (let i = 0; i < 9; i++) {
    soma = soma + parseInt(cpf.charAt(i)) * (10 - i)
  }
  let resto = (soma * 10) % 11

  if (resto === 10 || resto === 11) resto = 0
  if (resto !== parseInt(cpf.charAt(9))) return false

  soma = 0
  for (let i = 0; i < 10; i++) {
    soma = soma + parseInt(cpf.charAt(i)) * (11 - i)
  }

  resto = (soma * 10) % 11

  if (resto === 10 || resto === 11) resto = 0
  if (resto !== parseInt(cpf.charAt(10))) return false
  return true
}
