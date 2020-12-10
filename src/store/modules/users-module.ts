import { Monitor, Professor, Tutor, User } from "@/store/modules/auth-types"
import { findAllUsersService } from "@/api/users/get-all"
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators"
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

export function isMonitor(user?: User | Tutor | Professor | Monitor | null): user is Monitor {
  return !!user && (user as User).isMonitor === true
}
@Module({
  namespaced: true,
  name: "users"
})
export default class UsersModule extends VuexModule implements CrudModule<User> {
  byId: Record<string, User> = {}

  meta: CrudMeta = { allFetched: false, lastFetchDate: null }

  get asArray(): User[] {
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
  ADD_NORMALIZED_ITEMS(payload: AddNormalizedItemsPayload<User>) {
    addNormalizedItems(this, payload)
  }

  @Mutation
  ADD_ITEMS(payload: User[]) {
    addItems(this, payload)
  }

  @Action({ rawError: true })
  async getAll() {
    return findAllUsersService().then(users => {
      this.ADD_ITEMS(users)
    })
  }
}
