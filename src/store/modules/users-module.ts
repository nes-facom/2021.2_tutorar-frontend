import { Action, Module } from "vuex-module-decorators"
import { User } from "@/store/modules/auth-types"
import getAllUsers from "@/api/users/get-all"
import CrudModule from "../utils/crud-module"

@Module({
  namespaced: true,
  name: "users"
})
export default class UsersModule extends CrudModule<User> {
  @Action({ rawError: true })
  async getAll() {
    return getAllUsers()
      .then(users => {
        this.SET_ITEMS(users)
      })
      .catch(error => {
        console.log(error)
      })
  }
}
