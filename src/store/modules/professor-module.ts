import { cadastroProfessorService, DadosCadastroProfessor } from "@/api/professor/cadastro-professor"
import { Monitor, Professor, Tutor, User } from "@/store/modules/auth-types"
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators"
import { RawProfessor } from "./users-types"
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
} from "../utils/crud-module-utils"

export function isProfessor(user?: User | Tutor | Professor | Monitor | null): user is Professor {
  if (!user) return false
  return (user as Professor).nivelLecionamento !== undefined && user.role === "professor"
}

export function affirmIsProfessor(user?: User | Tutor | Professor | Monitor | null): Professor {
  if (isProfessor(user)) return user
  throw new Error("Could affirm user role as professor")
}

function normalizaProfessor(raw: RawProfessor): Professor {
  const { professor: dadosProfessor, ...dadosPessoa } = raw
  const professor: Professor = { ...dadosProfessor, ...dadosPessoa, role: "professor" }
  return professor
}

@Module({
  namespaced: true,
  name: "professores"
})
export default class ProfessorModule extends VuexModule implements CrudModule<Professor> {
  byId: Record<string, Professor> = {}

  meta: CrudMeta = { allFetched: false, lastFetchDate: null }

  get asArray(): Professor[] {
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
  ADD_NORMALIZED_ITEMS(payload: AddNormalizedItemsPayload<Professor>) {
    addNormalizedItems(this, payload)
  }

  @Mutation
  ADD_ITEMS(payload: Professor[]) {
    addItems(this, payload)
  }

  @Action({ rawError: true })
  async cadastraTutor(payload: DadosCadastroProfessor): Promise<Professor> {
    const professorCadastrado = await cadastroProfessorService(payload)
    return normalizaProfessor(professorCadastrado)
  }

  // @Action({ rawError: true })
  // async updateTutor(payload: UpdateTutorPayload): Promise<Tutor> {
  //   const { id, tutor } = payload.data

  //   const options = { ...{ updateRecord: true }, ...payload.options }

  //   return new Promise((resolve, reject) => {
  //     updateTutorService(id, tutor)
  //       .then(raw => {
  //         const tutor = normalizaTutor(raw)
  //         if (options.updateRecord) this.UPDATE({ id: tutor._id, item: tutor })
  //         resolve(tutor)
  //       })
  //       .catch(apiError => {
  //         reject(apiError)
  //       })
  //   })
  // }
}
