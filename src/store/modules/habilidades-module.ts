import { getAllHabilidadesService } from "@/api/habilidades/get-all"
import { Action, Module } from "vuex-module-decorators"
import CrudModule from "../utils/crud-module"

export interface Habilidade {
  _id: string
  nome: string
  categoria: CATEGORIAS_HABILIDADES
  __v: number
}

export enum CATEGORIAS_HABILIDADES {
  GOOGLE = "google",
  EDUCACAO = "educação",
  COMUNICACAO = "comunicação",
  ORGANIZACAO = "organização",
  PROGRAMACAO = "programação",
  EDICAO_DE_VIDEO = "edição de video",
  CRIACAO_CONTEUDO = "criação de conteudo"
}

interface FetchAllPayload {
  /**
   * Se as habilidades devem ser buscadas novamente,
   * mesmo se ja foram anteriormente
   */
  forceRefetch: boolean
}

@Module({
  namespaced: true,
  name: "habilidades"
})
export default class HabilidadesModule extends CrudModule<Habilidade> {
  @Action({ rawError: true })
  async fetchAll(payload: FetchAllPayload = { forceRefetch: true }): Promise<void> {
    if (!payload.forceRefetch && this.meta.allFetched) return

    return getAllHabilidadesService().then(habilidades => {
      this.SET_ITEMS(habilidades)
      this.UPDATE_META({ allFetched: true })
    })
  }
}
