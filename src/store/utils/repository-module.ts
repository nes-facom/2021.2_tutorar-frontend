import { IdentifiableItem, BaseRepository } from "@/api/repositories/base-repository"
import { VuexModule, Mutation, Action } from "vuex-module-decorators"

interface InsertOptions {
  updateExistingRecord: boolean
}

export interface Items {
  [x: string]: IdentifiableItem
}

export default abstract class RepositoryModule<I extends IdentifiableItem> extends VuexModule {
  ids: (string | number)[] = []
  byId: Items = {}

  abstract repository: BaseRepository<I>

  @Mutation
  SET_ITEMS(items: IdentifiableItem[]) {
    items.map(item => {
      const id = item.id
      this.ids.push(id)
      this.byId[id] = item
    })
  }

  @Mutation
  ADD(payload: { id: number; item: I; options: InsertOptions }) {
    const { id, item, options } = payload

    if (!options.updateExistingRecord && this.byId[id]) return

    this.byId[id] = Object.assign(this.byId[id], item)
  }

  @Mutation
  UPDATE(payload: { id: number; item: I }) {
    const { id, item: newItem } = payload
    let item = this.byId[id]

    if (!item) return

    item = Object.assign(item, newItem)
  }

  @Mutation
  DELETE(id: number) {
    const { byId, ids } = this

    delete byId[id]

    ids.filter(id => id !== id)
  }

  @Action
  async fetch() {
    await this.repository
      .get()
      .then(items => {
        this.context.commit("SET_ITEMS", items)
      })
      .catch(errorMessage => {
        console.error(errorMessage)
      })
  }

  get asArray() {
    return Object.values(this.byId)
  }
}
