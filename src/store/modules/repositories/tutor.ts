import RepositoryModule from "../../utils/repository-module"
import { Action, Module } from "vuex-module-decorators"
import { UserTutor } from "../auth"
import { TutorRepository } from "@/api/repositories/tutor"

@Module({ namespaced: true, name: "tutores" })
export default class TutorModule extends RepositoryModule<UserTutor> {
  tutores: UserTutor[] = []

  repository = new TutorRepository()

  @Action({ rawError: true })
  async cadastraTutor(tutor: UserTutor, foto: File) {
    return this.repository
      .create(tutor, foto)
      .then(() => {
        console.log("created")
      })
      .catch(error => {
        console.log(error)
      })
  }
}
