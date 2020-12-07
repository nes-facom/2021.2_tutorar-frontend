import { Action, getModule, Module } from "vuex-module-decorators"
import { Monitor, Professor, Tutor, User } from "@/store/modules/auth-types"
import CrudModule from "../utils/crud-module"
import { updateTutorService } from "@/api/tutor/update-tutor"
import { RawTutor } from "./users-types"
import { DadosCadastroTutor, cadastroTutorService } from "@/api/tutor/cadastro-tutor"
import { findAllTutoresService } from "@/api/tutor/find-all-tutores"
import { findTutorByIdService } from "@/api/tutor/find-by-id"
import HabilidadesModule, { Habilidade } from "./habilidades-module"
import store from ".."
import { removeMongoAttrsFromDocument } from "@/utils"

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
export default class TutorModule extends CrudModule<Tutor> {
  /**
   * Retorna um getter das habilidades de um tutor
   */
  get habilidadesTutor(): (idTutor: string) => Habilidade[] {
    return (idTutor: string): Habilidade[] => {
      const tutor = this.byId[idTutor]
      if (!tutor) return []
      const habModule = getModule(HabilidadesModule, store)
      return habModule.asArray.filter(hab => tutor.habilidades.indexOf(hab._id) !== -1)
    }
  }

  /**
   * Busca um tutor por ID
   */
  @Action({ rawError: true })
  async getById(id: string): Promise<RawTutor> {
    const rawTutor = await findTutorByIdService(id)

    const tutor = normalizaTutor(rawTutor)

    this.ADD_ITEM({ id: tutor._id, item: tutor })
    return rawTutor
  }

  /**
   * Retorna todos os tutores cadastrados na plataforma
   */
  @Action({ rawError: true })
  async getAllTutores(saveInState = true): Promise<Tutor[]> {
    const tutoresCru = await findAllTutoresService()
    // todo remover slice, ver match com vitor
    const tutores = tutoresCru.slice(0, 20).map(tutor => normalizaTutor(tutor))
    if (saveInState) this.SET_ITEMS(tutores)
    return tutores
  }

  /**
   * Cadastra um tutor na plataforma
   */
  @Action({ rawError: true })
  async cadastraTutor(payload: DadosCadastroTutor): Promise<Tutor> {
    const tutorCadastrado = await cadastroTutorService(payload)
    return normalizaTutor(tutorCadastrado)
  }

  /**
   * Atualiza um tutor
   */
  @Action({ rawError: true })
  async updateTutor(payload: UpdateTutorPayload): Promise<Tutor> {
    const { id, tutor } = payload.data

    const options = { ...{ updateRecord: true }, ...payload.options }

    return new Promise((resolve, reject) => {
      updateTutorService(id, tutor)
        .then(raw => {
          const tutor = normalizaTutor(raw)
          if (options.updateRecord) this.UPDATE({ id: tutor._id, item: tutor })
          resolve(tutor)
        })
        .catch(apiError => {
          reject(apiError)
        })
    })
  }
}
