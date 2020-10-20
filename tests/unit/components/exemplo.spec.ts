// setup deve ser importado para carregar o vuetify
import "./setup"
import { shallowMount } from "@vue/test-utils"
import PageHome from "@/pages/Home.vue"

describe("PageHome", () => {
  it("should render compontent's props !", () => {
    const message = "O componente deve renderizar essa mensagem !"

    const wrapper = shallowMount(PageHome, {
      propsData: { message }
    })

    expect(wrapper.text()).toMatch(message)
  })
})
