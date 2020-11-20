import { AxiosError } from "axios"

export interface ApiErrorResponse {
  statusCode: number
  message: string
  error: string
}

const isAxiosError = (error: Error): error is AxiosError => {
  return (error as AxiosError).isAxiosError === true
}

const isApiError = (error: AxiosError): boolean => {
  const data = error.response?.data
  return data && data.statusCode !== undefined && data.message !== undefined && data.error !== undefined
}

/**
 * Retorna os dados de erro da API, caso não seja um axios error
 * ou não seja um erro padronizado pela api da throw nele
 */
export default (error: Error): ApiErrorResponse => {
  if (!isAxiosError(error) || !isApiError(error)) throw error
  return error.response?.data
}
