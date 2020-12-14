import { Monitor, Professor, Tutor, User } from "@/store/modules/auth-types"
import { findAllUsersService } from "@/api/users/get-all"
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators"
import {
  addItems,
  addNormalizedItems,
  AddNormalizedItemsPayload,
  CrudMeta,
  CrudModule,
  markAsFetched,
  MongoDocument,
  removeItemsById,
  resetState,
  updateMeta
} from "../utils/crud-module-utils"
import { DadosSolicitacaoTutoria, solicitarTutoriaService } from "@/api/tutoria/solicitar-tutoria"
import { getTutoriasFromTutorService } from "@/api/tutoria/get-tutorias-from-tutor"

export interface Tutoria extends MongoDocument {
  tutorId: string

  professorId: string

  tutoringDate: Date

  tutoringHour: string

  requestMessage: string

  requestState: string
}

@Module({
  namespaced: true,
  name: "tutorias"
})
export default class TutoriaModule extends VuexModule implements CrudModule<Tutoria> {
  byId: Record<string, Tutoria> = {}

  meta: CrudMeta = { allFetched: false, lastFetchDate: null }

  get asArray(): Tutoria[] {
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
  ADD_NORMALIZED_ITEMS(payload: AddNormalizedItemsPayload<Tutoria>) {
    addNormalizedItems(this, payload)
  }

  @Mutation
  ADD_ITEMS(payload: Tutoria[]) {
    addItems(this, payload)
  }

  @Action
  async solicitarTutoria(dados: DadosSolicitacaoTutoria): Promise<Tutoria> {
    return solicitarTutoriaService(dados).then(tutoriaSolicitada => {
      this.ADD_ITEMS([tutoriaSolicitada])
      return tutoriaSolicitada
    })
  }

  @Action
  async getTutoriasPendentesFromTutor(idTutor: string): Promise<Tutoria[]> {
    return getTutoriasFromTutorService(idTutor).then(tutorias => {
      this.ADD_ITEMS(tutorias)
      return tutorias
    })
  }
}
