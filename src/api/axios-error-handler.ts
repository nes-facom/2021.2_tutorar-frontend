import { AxiosError } from "axios"

const isAxiosError = (error: Error): error is AxiosError => {
  return (error as AxiosError).isAxiosError === true
}

/**
 * A implementar, esperando padronização de erros do back
 *
 * @param error - erro de uma axios request
 * @param message - mensagem de erro a retornar caso o erro não contenha uma
 */
export default (error: Error, message = "Erro ao se conectar com o servidor"): string => {
  // Como é um error handler, é sempre bom verificar o tipo do erro
  if (!isAxiosError(error)) return message

  if (error.response?.data?.error) message = error.response.data.error

  return message
}
