import { Module, VuexModule, Mutation } from "vuex-module-decorators";

@Module({ namespaced: true, name: "theme" })
export default class Theme extends VuexModule {

  isAppBarVisible = true;

  isNavigationDrawerVisible = true;

  /**
   * Esconde ou exibe o navigation drawer
   */
  @Mutation
  SET_DRAWER(payload: boolean) {
    this.isNavigationDrawerVisible = payload;
  }

  /**
   * Esconde ou exibe a app bar (barra superior)
   */
  @Mutation
  SET_APP_BAR(payload: boolean) {
    this.isAppBarVisible = payload;
  }
}
