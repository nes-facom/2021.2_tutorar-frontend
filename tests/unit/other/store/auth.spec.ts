import store from "@/store"
import AuthModule from "@/store/modules/auth"
import { getModule } from "vuex-module-decorators"
import { LoginResponse, loginService } from "@/api/auth/login"
import { FORMACAO_ACADEMICA } from "@/utils/constants/formacao-academica"
import { NIVEL_LECIONAMENTO } from "@/utils/constants/nivel-lecionamento"

// Mockup do módulo de login
jest.mock("@/api/auth/login", () => ({
  __esModule: true,

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
    const { user, token }: LoginResponse = {
      user: {
        _id: "2",
        __v: 1,

        role: "professor",

        cpf: "03690208122",
        nome: "Fulano Da Silva Sanches",
        email: "fulano.silva@hotmail.com",
        celular: "67998801996",
        dataNascimento: "23/10/1996",
        genero: "M",

        inicioLecionamento: "2002-12-09",
        formacaoAcademica: FORMACAO_ACADEMICA.BACHARELADO,
        nivelLecionamento: NIVEL_LECIONAMENTO.EDUCACAO_INFANTIL,

        isAdmin: false,
        isMonitor: false
      },
      token: {
        type: "bearer",
        value: "eyJhbGciOiJIUzI1NiVCJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV"
      }
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
  })

  describe("@Mutation AUTH_LOGOUT:", () => {
    beforeEach(() => {
      authModule = getModule(AuthModule, store)
      localStorage.clear()
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    it("Removes the token from localstorage and state", () => {
      localStorage.setItem("api_token", "This should be cleared")
      authModule.AUTH_LOGOUT()

      expect(localStorage.__STORE__.token).toBeUndefined()
      expect(localStorage.getItem("api_token")).toBeNull()
      expect(authModule.token).toBeNull()
    })
  })

  describe("@Action login:", () => {
    const email = "dummy_username"
    const password = "dummy_password"

    beforeEach(() => {
      authModule = getModule(AuthModule, store)
    })

    it("Should fire the loginService with the provided arguments", async () => {
      await authModule.login({ email, password })

      expect(loginService).toHaveBeenLastCalledWith("dummy_username", "dummy_password")
    })
  })

  describe("@Action LOGOUT:", () => {
    beforeEach(() => {
      authModule = getModule(AuthModule, store)
    })

    it("Should call the AUTH_LOGOUT mutation with the same args", () => {
      const spy = jest.spyOn(store, "commit")

      const payload = { clearLocalStorage: false, redirectTo: "/some/page" }

      authModule.logout(payload)

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenLastCalledWith("auth/AUTH_LOGOUT", payload, undefined)
    })
  })
})
