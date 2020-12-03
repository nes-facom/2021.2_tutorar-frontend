import handleAxiosError from "@/api/axios-error-handler"
import { api } from "@/api/axios-instance-creator"

export enum CATEGORIAS {
  GOOGLE = "google",
  EDUCACAO = "educação",
  COMUNICACAO = "comunicação",
  ORGANIZACAO = "organização",
  PROGRAMACAO = "programação",
  EDICAO_DE_VIDEO = "edição de video",
  CRIACAO_CONTEUDO = "criação de conteudo"
}

export interface Habilidade {
  _id: string
  nome: string
  categoria: CATEGORIAS
  descricao?: string
}

export function getAllHabilidadesService(): Promise<Habilidade[]> {
  return new Promise((resolve, reject) => {
    api()
      .get("habilidades")
      .then(res => {
        const habilidades: Habilidade[] = res.data
        resolve(habilidades)
      })
      .catch(err => {
        const apiError = handleAxiosError(err)
        reject(apiError)
      })
  })
}
