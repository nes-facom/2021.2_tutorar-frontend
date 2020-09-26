import Store from "@/store";
import ThemeModule from "@/store/modules/theme";
import { getModule } from "vuex-module-decorators";

describe("Vuex Theme Module", () => {
  let themeModule = getModule(ThemeModule, Store);

  // Reinstancio para resetar estado
  beforeEach(() => {
    themeModule = getModule(ThemeModule, Store);
  });

  it("@Mutation SET_APP_BAR: Should change the AppBar state", () => {
    themeModule.SET_APP_BAR(false);
    expect(themeModule.isAppBarVisible).toBe(false);

    themeModule.SET_APP_BAR(true);
    expect(themeModule.isAppBarVisible).toBe(true);
  });

  it("@Mutation SET_DRAWER: Should change the NavigationDrawer state", () => {
    themeModule.SET_DRAWER(false);
    expect(themeModule.isNavigationDrawerVisible).toBe(false);

    themeModule.SET_DRAWER(true);
    expect(themeModule.isNavigationDrawerVisible).toBe(true);
  });
});
