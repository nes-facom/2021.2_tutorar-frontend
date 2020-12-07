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

export interface CrudModuleMeta {
  /**
   * Indica se todos os registros ja foram buscados da api
   */
  allFetched: boolean
}

export default class CrudModule<Item extends Identifiable> extends VuexModule {
  ids: (string | number)[] = []
  byId: { [x: string]: Item } = {}

  meta: CrudModuleMeta = {
    allFetched: false
  }

  get asArray() {
    return Object.values(this.byId)
  }

  @Mutation
  UPDATE_META(newMetaData: CrudModuleMeta) {
    this.meta = { ...this.meta, ...newMetaData }
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
  ADD_ITEM(payload: { id: number | string; item: Item; options?: InsertOptions }) {
    const { id, item, options } = payload

    if (!options?.updateExistingRecord && this.byId[id]) return

    Vue.set(this.byId, id, { ...this.byId[id], ...item })
  }

  @Mutation
  UPDATE(payload: { id: string; item: Item }) {
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
