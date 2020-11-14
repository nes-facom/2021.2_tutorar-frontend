import { VuexModule, Mutation } from "vuex-module-decorators"
import Vue from "vue"
interface InsertOptions {
  updateExistingRecord: boolean
}

interface Identifiable {
  _id: string | number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any
}

export default class CrudModule<Item extends Identifiable> extends VuexModule {
  ids: (string | number)[] = []
  byId: { [x: string]: Item } = {}

  get asArray() {
    return Object.values(this.byId)
  }

  @Mutation
  RESET_STATE() {
    this.ids = []
    this.byId = {}
  }

  @Mutation
  SET_ITEMS(items: Item[]) {
    items.map(item => {
      const id = item._id
      this.ids.push(id)
      Vue.set(this.byId, id, item)
    })
  }

  @Mutation
  ADD(payload: { id: number; item: Item; options: InsertOptions }) {
    const { id, item, options } = payload

    if (!options.updateExistingRecord && this.byId[id]) return

    Vue.set(this.byId, id, { ...this.byId[id], ...item })
  }

  @Mutation
  UPDATE(payload: { id: number; item: Item }) {
    const { id, item: newItem } = payload
    let item = this.byId[id]

    if (!item) return

    item = { ...item, ...newItem }
  }

  @Mutation
  DELETE(id: number) {
    delete this.byId[id]
    this.ids.filter(id => id !== id)
  }
}
