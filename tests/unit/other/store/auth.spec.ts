import Store from "@/store";
import router from '@/router'
import AuthModule from "@/store/modules/auth";
import { getModule } from "vuex-module-decorators";
import loginService, { ExpectedResponseData as LoginRequestData } from "@/api/auth/login";

// Mockup do módulo de login
jest.mock('@/api/auth/login', () => ({

  // Preciso disso porque uso es6 imports, see: https://github.com/facebook/jest/issues/5579#event-1477087994
  __esModule: true,

  // falo que o export default do módulo de login é esse mock
  default:
    // Basicamente um mock do jest que retorna uma promisse a qual retorna um usuario + token
    jest.fn(() => new Promise((resolve, reject) => {

      resolve({
        user: {
          role: 'professor',
          name: 'Ciclano da Silva Neves'
        },
        token: 'ASDHUIASOHDIUSA'
      });
    }))
}))

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

    it("Stores the user token in localStorage as 'Bearer: {token}'", () => {
      expect(localStorage.getItem('token')).toBeNull()

      authModule.AUTH_SUCCESS({ user, token });
      const prefixedToken = `Bearer ${token}`

      expect(localStorage.setItem).toHaveBeenLastCalledWith('token', prefixedToken);
      expect(window.localStorage.getItem('token')).toBe(prefixedToken)
    });

    it("Sets the state Token", () => {
      authModule.AUTH_SUCCESS({ user, token });
      expect(authModule.token).toBe(token)
    });

    it("Sets the state User", () => {
      authModule.AUTH_SUCCESS({ user, token });
      expect(authModule.user).toBe(user)
    });

    it("Calls the router to redirect the user to '/home' when he's not there", async () => {

      // Faço um push para uma rota dummy apenas para que a rota atual seja != de '/home'
      await router.push({ path: 'rota/exemplo' })

      // Agora faço um spy na function 'push' do router
      const spy = jest.spyOn(router, 'push')

      authModule.AUTH_SUCCESS({ user, token });
      expect(spy).toHaveBeenLastCalledWith({ path: '/home' });
    });

    it("Should NOT call the router to redirect the user to '/home' when he's there", async () => {

      // Isso deve acontecer antes de eu criar o spy, pois essa execução não deve ser capturada
      if (router.currentRoute.path !== "/home") {
        await router.push({ path: '/home' })
      }

      const spy = jest.spyOn(router, 'push')
      authModule.AUTH_SUCCESS({ user, token });

      // Espero 1 e não 0 pois o jest chama o método ao criar o spy... 
      expect(spy).toHaveBeenCalledTimes(1);
    });
  })

  describe("@Mutation AUTH_LOGOUT:", () => {

    beforeEach(() => {
      authModule = getModule(AuthModule, Store);
      localStorage.clear();
    });

    afterEach(() => {
      // Limpo o mock da localstorage para evitar leaks
      jest.clearAllMocks();
    });

    it("Removes the token from localstorage and state", () => {
      localStorage.setItem('token', 'This should be cleared')
      authModule.AUTH_LOGOUT()

      expect(localStorage.__STORE__.token).toBeUndefined()
      expect(localStorage.getItem('token')).toBeNull()
      expect(authModule.token).toBeNull()
    });

    it("Clears the localStorage when 'clearLocalStorage' is true", () => {
      authModule.AUTH_LOGOUT({ clearLocalStorage: true })

      // Espero 2 pois a chamo em beforeEach
      expect(localStorage.clear).toHaveBeenCalledTimes(2);
    });

    it("Calls the router to redirect to '/home' when redirectTo is not specified", async () => {
      await router.push({ path: "/not/home" })

      const spy = jest.spyOn(router, 'push')
      authModule.AUTH_LOGOUT();

      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenLastCalledWith({ path: '/home' });
    });

    it("Calls the router to redirect to the route specified on redirectTo", async () => {
      const spy = jest.spyOn(router, 'push')
      authModule.AUTH_LOGOUT({ redirectTo: 'some/fancy/route' });

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenLastCalledWith({ path: 'some/fancy/route' });
    });

    it("Should NOT call the router to redirect to the route user is currently in", async () => {
      await router.push({ path: "/home" })
      const spy = jest.spyOn(router, 'push')

      // Tento redirecionar para a mesma rota ('/home') especificando-a
      authModule.AUTH_LOGOUT({ redirectTo: '/home' });

      // Tento redirecionar para a mesma rota ('/home') sem especifica-la
      // pois ela é a rota default
      authModule.AUTH_LOGOUT();

      // Só espero 1 call que é a do spyOn
      expect(spy).toHaveBeenCalledTimes(1);
    });
  })

  describe("@Action LOGIN:", () => {

    beforeEach(() => {
      authModule = getModule(AuthModule, Store);
    });

    it('Should fire the loginService with the provided arguments', async () => {
      await authModule.LOGIN({ username: 'dummy_username', password: 'dummy_password' })

      expect(loginService).toHaveBeenLastCalledWith('dummy_username', 'dummy_password');
    })
  })
});
