import handleAxiosError from "@/api/axios-error-handler"
import axios from "@/api/axios-instance-creator"

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

export default (): Promise<Habilidade[]> => {
  return new Promise((resolve, reject) => {
    axios()
      .get("habilidades")
      .then(res => {
        const habilidades: Habilidade[] = res.data
        resolve(habilidades)
      })
      .catch(err => {
        const errorMessage = handleAxiosError(err, "Erro ao buscar habilidades")
        reject(errorMessage)
      })
  })
}
