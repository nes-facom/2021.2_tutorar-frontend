import store from "@/store"
import router from "@/router"
import AuthModule from "@/store/modules/auth"
import { getModule } from "vuex-module-decorators"
import loginService, { ExpectedResponseData as LoginRequestData } from "@/api/auth/login"

// Mockup do módulo de login
jest.mock("@/api/auth/login", () => ({
  // Preciso disso porque uso es6 imports, see: https://github.com/facebook/jest/issues/5579#event-1477087994
  __esModule: true,

  // falo que o export default do módulo de login é esse mock
  default: jest.fn(
    () =>
      new Promise(resolve => {
        const exempleLoginResponse = {
          user: {
            role: "professor",
            name: "Ciclano da Silva Neves"
          },
          token: "batata"
        }
        resolve(exempleLoginResponse)
      })
  )
}))

describe("Vuex Auth Module", () => {
  let authModule = getModule(AuthModule, store)

  describe("@Mutation AUTH_SUCCESS:", () => {
    const { user, token }: LoginRequestData = {
      user: {
        role: "professor",

        cpf: "03690208122",
        nome: "Fulano Da Silva Sanches",
        email: "fulano.silva@hotmail.com",
        celular: "67998801996",
        dataNascimento: "23/10/1996",
        genero: "masculino",

        dataInicioEnsino: "12/04/2015",
        formacaoAcademica: "superior",
        nivelLecionamento: "superior"
      },
      token: "eyJhbGciOiJIUzI1NiVCJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV"
    }

    beforeAll(() => {
      localStorage.clear()
    })

    beforeEach(() => {
      authModule = getModule(AuthModule, store)
    })

    it("Stores the user token in localStorage", () => {
      expect(localStorage.getItem("api_token")).toBeNull()

      authModule.AUTH_SUCCESS({ user, token })

      expect(localStorage.setItem).toHaveBeenCalledWith("api_token", token)
      expect(window.localStorage.getItem("api_token")).toBe(token)
    })

    it("Sets the state Token", () => {
      authModule.AUTH_SUCCESS({ user, token })
      expect(authModule.token).toBe(token)
    })

    it("Sets the state User", () => {
      authModule.AUTH_SUCCESS({ user, token })
      expect(authModule.user).toBe(user)
    })

    it("Calls the router to redirect the user to '/home' when he's not there", async () => {
      // Faço um push para uma rota dummy apenas para que a rota atual seja != de '/home'
      await router.push({ path: "rota/exemplo" })

      // Agora faço um spy na function 'push' do router
      const spy = jest.spyOn(router, "push")

      authModule.AUTH_SUCCESS({ user, token })
      expect(spy).toHaveBeenLastCalledWith({ path: "/home" })
    })

    it("Should NOT call the router to redirect the user to '/home' when he's there", async () => {
      // Isso deve acontecer antes de eu criar o spy, pois essa execução não deve ser capturada
      if (router.currentRoute.path !== "/home") {
        await router.push({ path: "/home" })
      }

      const spy = jest.spyOn(router, "push")
      authModule.AUTH_SUCCESS({ user, token })

      // Espero 1 e não 0 pois o jest chama o método ao criar o spy...
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe("@Mutation AUTH_LOGOUT:", () => {
    beforeEach(() => {
      authModule = getModule(AuthModule, store)
      localStorage.clear()
    })

    afterEach(() => {
      // Limpo o mock da localstorage para evitar leaks
      jest.clearAllMocks()
    })

    it("Removes the token from localstorage and state", () => {
      localStorage.setItem("api_token", "This should be cleared")
      authModule.AUTH_LOGOUT()

      expect(localStorage.__STORE__.token).toBeUndefined()
      expect(localStorage.getItem("api_token")).toBeNull()
      expect(authModule.token).toBeNull()
    })

    it("Clears the localStorage when 'clearLocalStorage' is true", () => {
      authModule.AUTH_LOGOUT({ clearLocalStorage: true })

      // Espero 2 pois a chamo em beforeEach
      expect(localStorage.clear).toHaveBeenCalledTimes(2)
    })

    it("Calls the router to redirect to '/home' when redirectTo is not specified", async () => {
      await router.push({ path: "/not/home" })

      const spy = jest.spyOn(router, "push")
      authModule.AUTH_LOGOUT()

      expect(spy).toHaveBeenCalledTimes(2)
      expect(spy).toHaveBeenLastCalledWith({ path: "/home" })
    })

    it("Calls the router to redirect to the route specified on redirectTo", async () => {
      const spy = jest.spyOn(router, "push")
      authModule.AUTH_LOGOUT({ redirectTo: "some/fancy/route" })

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenLastCalledWith({ path: "some/fancy/route" })
    })

    it("Should NOT call the router to redirect to the route user is currently in", async () => {
      await router.push({ path: "/home" })
      const spy = jest.spyOn(router, "push")

      // Tento redirecionar para a mesma rota ('/home') especificando-a
      authModule.AUTH_LOGOUT({ redirectTo: "/home" })

      // Tento redirecionar para a mesma rota ('/home') sem especifica-la
      // pois ela é a rota default
      authModule.AUTH_LOGOUT()

      // Só espero 1 call que é a do spyOn
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe("@Action LOGIN:", () => {
    const username = "dummy_username"
    const password = "dummy_password"

    beforeEach(() => {
      authModule = getModule(AuthModule, store)
    })

    it("Should fire the loginService with the provided arguments", async () => {
      await authModule.LOGIN({ username, password })

      expect(loginService).toHaveBeenLastCalledWith("dummy_username", "dummy_password")
    })
  })

  describe("@Action LOGOUT:", () => {
    beforeEach(() => {
      authModule = getModule(AuthModule, store)
    })

    it("Should call the AUTH_LOGOUT mutation with the same args", () => {
      /**
       * Importante !
       * authModule é apenas uma classe, pra espiar nos commit tenho que
       * utilizar a store em si
       */
      const spy = jest.spyOn(store, "commit")

      const payload = { clearLocalStorage: false, redirectTo: "/some/page" }

      authModule.LOGOUT(payload)

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenLastCalledWith("auth/AUTH_LOGOUT", payload, undefined)
    })
  })
})
