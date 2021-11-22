import { Action, getModule, Module, Mutation, VuexModule } from "vuex-module-decorators"
import { Monitor, Professor, Tutor, User } from "@/store/modules/auth-types"
import { updateTutorService } from "@/api/tutor/update-tutor"
import { RawTutor } from "./users-types"
import { DadosCadastroTutor, cadastroTutorService } from "@/api/tutor/cadastro-tutor"
import { findAllTutoresService } from "@/api/tutor/find-all-tutores"
import { findTutorByIdService } from "@/api/tutor/find-by-id"
import HabilidadesModule, { Habilidade } from "./habilidades-module"
import { removeMongoAttrsFromDocument } from "@/utils"
import {
  AddNormalizedItemsPayload,
  addNormalizedItems,
  removeItemsById,
  markAsFetched,
  CrudModule,
  resetState,
  updateMeta,
  addItems,
  CrudMeta
} from "../utils/crud-module-utils"
import store from ".."

export function isTutor(user?: User | Tutor | Professor | Monitor | null): user is Tutor {
  if (!user) return false
  return (user as Tutor).habilidades !== undefined && user.role === "tutor"
}

export function affirmIsTutorAndReturn(user?: User | Tutor | Professor | Monitor | null): Tutor {
  if (isTutor(user)) return user
  throw new Error("Could affirm user role as tutor")
}

export interface UpdateTutorPayload {
  data: {
    id: string
    tutor: Tutor
    foto?: File
  }
  options?: {
    /**
     * Se o registro do tutor deve ser atualizado na store
     * caso a chamada de certo (default: true)
     */
    updateRecord?: boolean
  }
}

/**
 * Formata o tutor como a API o envia para como utilizamos no front
 */
function normalizaTutor(raw: RawTutor): Tutor {
  const { tutor: dadosTutor, ...dadosPessoa } = raw
  if (dadosTutor.agenda) removeMongoAttrsFromDocument(dadosTutor.agenda)
  const tutor: Tutor = { ...dadosTutor, ...dadosPessoa, role: "tutor" }
  return tutor
}

@Module({
  name: "tutores",
  namespaced: true
})
export default class TutorModule extends VuexModule implements CrudModule<Tutor> {
  byId: Record<string, Tutor> = {}

  meta: CrudMeta = { allFetched: false, lastFetchDate: null }

  get asArray(): Tutor[] {
    return Object.values(this.byId)
  }

  get habilidadesTutor(): (idTutor: string) => Habilidade[] {
    return (idTutor: string): Habilidade[] => {
      const tutor = this.byId[idTutor]
      if (!tutor) return []
      const habModule = getModule(HabilidadesModule, store)
      return habModule.asArray.filter(hab => tutor.habilidades.indexOf(hab._id) !== -1)
    }
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
  ADD_ITEMS(payload: Tutor[]) {
    addItems(this, payload)
  }

  @Mutation
  ADD_NORMALIZED_ITEMS(payload: AddNormalizedItemsPayload<Tutor>) {
    addNormalizedItems(this, payload)
  }

  /**
   * Busca um tutor por ID
   */
  @Action({ rawError: true })
  async getById(id: string): Promise<RawTutor> {
    const rawTutor = await findTutorByIdService(id)

    const tutor = normalizaTutor(rawTutor)

    this.ADD_ITEMS([tutor])
    return rawTutor
  }

  @Action({ rawError: true })
  async getAllTutores(saveInState = true): Promise<Tutor[]> {
    const tutoresCru = await findAllTutoresService()
    const tutores = tutoresCru.map(tutor => normalizaTutor(tutor))
    if (saveInState) this.ADD_ITEMS(tutores)
    return tutores
  }

  @Action({ rawError: true })
  async cadastraTutor(payload: DadosCadastroTutor): Promise<Tutor> {
    const tutorCadastrado = await cadastroTutorService(payload)
    return normalizaTutor(tutorCadastrado)
  }

  @Action({ rawError: true })
  async updateTutor(payload: UpdateTutorPayload): Promise<Tutor> {
    const { id, tutor } = payload.data

    const defaultOptions = { updateRecord: true }

    const options = { ...defaultOptions, ...payload.options }

    return new Promise((resolve, reject) => {
      updateTutorService(id, tutor)
        .then(raw => {
          console.log("rawTutor", raw)
          const tutor = normalizaTutor(raw)
          console.log("normalizedTutor", tutor)
          if (options.updateRecord) this.ADD_ITEMS([tutor])
          resolve(tutor)
        })
        .catch(apiError => {
          reject(apiError)
        })
    })
  }
}
