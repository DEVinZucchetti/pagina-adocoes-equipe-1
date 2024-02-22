import { flushPromises, mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Pets from "./Pets.vue";
import PetService from "@/services/PetService";


describe('tela de listagem de pets', () => {

    beforeEach(() => {
        vi.spyOn(PetService, 'getAllPets').mockResolvedValue([

            {
                id: 2,
                pet_name: "Magu",
                age: 3
            }
        ])
    })


    it("espera-se que a tela seja renderizada", async () => {

        const wrapper = mount(Pets)

        await flushPromises()

        expect(wrapper).toBeTruthy()
    })

    it("espera-se que liste um card para cada pet", async () => {

        const wrapper = mount(Pets)
        await flushPromises()
        
        expect(wrapper.text()).toContain("Magu")

    })

    it("espera-se que navegue para pagina de perfil do pet clicado", async () => {

        const mockRouter = {
            push: vi.fn()
        }

        const wrapper = mount(Pets, {
            global: {
                mocks: {
                    $router: mockRouter
                }
            }
        })

        await flushPromises()

        wrapper.findAll("[data-test='item-pet']")[0].trigger("click")

        expect(mockRouter.push).toHaveBeenCalledWith('/pets-adocao/2/perfil')
    })
})