import { Monitor, Professor, Tutor, User } from "@/store/modules/auth-types"
import { findAllUsersService } from "@/api/users/get-all"
import { Action, Module } from "vuex-module-decorators"
import CrudModule from "../utils/crud-module"

export function isMonitor(user?: User | Tutor | Professor | Monitor | null): user is Monitor {
  return !!user && (user as User).isMonitor === true
}
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
