import "../../setup";
import AuthModule from "@/store/modules/auth";

describe("Vuex Theme Module", () => {

  let authModule = new AuthModule(AuthModule);

  // Reinstancio para resetar estado
  beforeEach(() => {
    authModule = new AuthModule(AuthModule);
  });

  // @TODO...
});
