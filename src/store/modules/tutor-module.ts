import { Action, Module } from "vuex-module-decorators"
import { Tutor } from "@/store/modules/auth-types"
import CrudModule from "../utils/crud-module"

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
}
