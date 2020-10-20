import { Module, VuexModule, Mutation } from "vuex-module-decorators"

@Module({ namespaced: true, name: "theme" })
export default class Theme extends VuexModule {
  isAppBarVisible = true

  isNavigationDrawerVisible = true

  @Mutation
  SET_DRAWER(payload: boolean) {
    this.isNavigationDrawerVisible = payload
  }

  @Mutation
  SET_APP_BAR(payload: boolean) {
    this.isAppBarVisible = payload
  }
}
