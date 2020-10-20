import { AxiosError } from "axios"

/**
 * A implementar...
 *
 * @see https://www.baeldung.com/rest-api-error-handling-best-practices
 *
 * @param error - erro de uma axios request
 * @param message - mensagem de erro a retornar caso o erro não contenha uma
 */
export default (error: AxiosError, message = "Erro ao se conectar com o servidor"): string => {
  // Apesar da tipagem, devo checar em runtime pra ter certeza
  if (!error.isAxiosError) return message

  if (error.response?.data?.message) message = error.response.data.message

  return message
}
