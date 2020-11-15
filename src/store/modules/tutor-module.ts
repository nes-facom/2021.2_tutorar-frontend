import { Action, Module } from "vuex-module-decorators"
import { Professor, Tutor, User } from "@/store/modules/auth-types"
import CrudModule from "../utils/crud-module"
import updateTutorService from "@/api/users/update-tutor"

export function isTutor(user: User | Tutor | Professor): user is Tutor {
  return (user as Tutor).habilidades !== undefined
}

export function isProfessor(user: User | Tutor | Professor): user is Professor {
  return (user as Professor).nivelLecionamento !== undefined
}

@Module({ namespaced: true, name: "tutores" })
export default class TutorModule extends CrudModule<Tutor> {
  @Action({ rawError: true })
  async cadastraTutor(tutor: Tutor, foto: File) {
    // return this.repository
    //   .create(tutor, foto)
    //   .then(() => {
    //     console.log("created")
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
  }

  @Action({ rawError: true })
  async updateTutor(payload: { id: string; tutor: Tutor; foto?: File }) {
    const { id, tutor } = payload
    updateTutorService(id, tutor)
    // return this.repository
    //   .create(tutor, foto)
    //   .then(() => {
    //     console.log("created")
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
  }
}
