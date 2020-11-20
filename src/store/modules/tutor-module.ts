import { Action, Module } from "vuex-module-decorators"
import { Professor, Tutor, User } from "@/store/modules/auth-types"
import CrudModule from "../utils/crud-module"
import updateTutorService from "@/api/tutor/update-tutor"
import { RawTutor } from "./users-types"

export function isTutor(user: User | Tutor | Professor): user is Tutor {
  return (user as Tutor).habilidades !== undefined
}

export function isProfessor(user: User | Tutor | Professor): user is Professor {
  return (user as Professor).nivelLecionamento !== undefined
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
     * caso a chamada de certo
     */
    updateRecord?: boolean
  }
}

function normalizaTutor(raw: RawTutor): Tutor {
  const { tutor: dadosTutor, ...dadosPessoa } = raw
  const tutor: Tutor = { ...dadosTutor, ...dadosPessoa, role: "tutor" }
  return tutor
}

@Module({ namespaced: true, name: "tutores" })
export default class TutorModule extends CrudModule<Tutor> {
  /**
   * Cadastra um tutor na plataforma
   */
  @Action({ rawError: true })
  async cadastraTutor(tutor: Tutor, foto: File) {
    console.log(tutor, foto)
    return null
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
