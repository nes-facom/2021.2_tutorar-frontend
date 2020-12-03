import { Action, Module } from "vuex-module-decorators"
import { User } from "@/store/modules/auth-types"
import { findAllUsersService } from "@/api/users/get-all"
import CrudModule from "../utils/crud-module"

@Module({
  namespaced: true,
  name: "users"
})
export default class UsersModule extends CrudModule<User> {
  @Action({ rawError: true })
  async getAll() {
    return findAllUsersService().then(users => {
      this.SET_ITEMS(users)
    })
  }
}
