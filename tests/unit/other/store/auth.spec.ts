import Store from "@/store";
import router from '@/router'
import AuthModule from "@/store/modules/auth";
import { getModule } from "vuex-module-decorators";
import { ExpectedResponseData as LoginRequestData } from "@/api/auth/login";

describe("Vuex Auth Module", () => {

  let authModule = getModule(AuthModule, Store);

  describe("@Mutation AUTH_SUCCESS:", () => {

    const { user, token }: LoginRequestData = {
      user: { name: "Fulano", role: "tutorando" },
      token: "eyJhbGciOiJIUzI1NiVCJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV"
    };

    beforeAll(() => {
      localStorage.clear()
    })

    beforeEach(() => {
      authModule = getModule(AuthModule, Store);
    });

    it("Should not have a token in localStorage before the mutation", () => {
      expect(localStorage.getItem('token')).toBeNull()
    })

    it("Should store the user token in localStorage as 'Bearer: {token}'", () => {
      authModule.AUTH_SUCCESS({ user, token });
      const prefixedToken = `Bearer ${token}`

      expect(localStorage.setItem).toHaveBeenLastCalledWith('token', prefixedToken);
      expect(window.localStorage.getItem('token')).toBe(prefixedToken)
    });

    it("Should set the state Token", () => {
      authModule.AUTH_SUCCESS({ user, token });
      expect(authModule.token).toBe(token)
    });

    it("Should set the state User", () => {
      authModule.AUTH_SUCCESS({ user, token });
      expect(authModule.user).toBe(user)
    });

    it("Should call the router to redirect the user to '/home' when he's not there", async () => {

      // Faço um push para uma rota dummy apenas para que a rota atual seja != de '/home'
      await router.push({ path: 'rota/exemplo' })

      // Agora faço um spy na function 'push' do router
      const spy = jest.spyOn(router, 'push')

      authModule.AUTH_SUCCESS({ user, token });
      expect(spy).toHaveBeenLastCalledWith({ path: '/home' });
    });

    it("Should NOT call the router to redirect the user to '/home' if he's there", async () => {

      // Isso deve acontecer antes de eu criar o spy, pois essa execução não deve ser capturada
      if (router.currentRoute.path !== "/home") {
        await router.push({ path: '/home' })
      }

      const spy = jest.spyOn(router, 'push')

      authModule.AUTH_SUCCESS({ user, token });

      // Espero que o método tenha sido chamado uma vez e não 0
      // pois o jest a chama ao criar o spy...
      expect(spy).toHaveBeenCalledTimes(1);
    });
  })
});
