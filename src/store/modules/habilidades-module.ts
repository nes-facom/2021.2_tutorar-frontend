import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators"
import { getAllHabilidadesService } from "@/api/habilidades/get-all"
import { MongoDocument } from "@/store/utils/crud-module-utils"
import {
  addItems,
  addNormalizedItems,
  AddNormalizedItemsPayload,
  CrudMeta,
  CrudModule,
  markAsFetched,
  removeItemsById,
  resetState,
  updateMeta
} from "@/store/utils/crud-module-utils"

export interface Habilidade extends MongoDocument {
  nome: string
  categoria: CATEGORIAS_HABILIDADES
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
export default class HabilidadesModule extends VuexModule implements CrudModule<Habilidade> {
  byId: Record<string, Habilidade> = {}

  meta: CrudMeta = { allFetched: false, lastFetchDate: null }

  get asArray(): Habilidade[] {
    return Object.values(this.byId)
  }

  @Mutation
  CLEAR_ITEMS() {
    this.byId = {}
  }

  @Mutation
  MARK_AS_FETCHED() {
    markAsFetched(this)
  }

  @Mutation
  UPDATE_META(meta: Partial<CrudMeta>) {
    updateMeta(this, meta)
  }

  @Mutation
  RESET_STATE() {
    resetState(this)
  }

  @Mutation
  REMOVE_ITEMS_BY_ID(ids: string[] | string) {
    removeItemsById(this, ids)
  }

  @Mutation
  ADD_NORMALIZED_ITEMS(payload: AddNormalizedItemsPayload<Habilidade>) {
    addNormalizedItems(this, payload)
  }

  @Mutation
  ADD_ITEMS(payload: Habilidade[]) {
    addItems(this, payload)
  }

  @Action({ rawError: true })
  async fetchAll(payload: FetchAllPayload = { forceRefetch: true }): Promise<void> {
    if (!payload.forceRefetch && this.meta.allFetched) return

    return await getAllHabilidadesService().then(habilidades => {
      this.ADD_ITEMS(habilidades)
      this.UPDATE_META({ allFetched: true })
    })
  }
}
