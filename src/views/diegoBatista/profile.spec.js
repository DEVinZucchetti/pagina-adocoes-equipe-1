import { flushPromises, mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import Profile from "./Profile.vue";
import PetService from "@/services/PetService";


describe('tela de perfil dos pets', () => {

    const mockRoute = {
        params: {
            id: 1
        }
    }

    vi.spyOn(PetService, 'getOnePet').mockResolvedValue([

    ])

    it("espera-se que a tela seja renderizada", () => {

        const component = mount(Profile, {
            global: {
                mocks: {
                    $router: mockRoute
                }
            }
        })

        expect(component).toBeTruthy()
    })

    it("espera-se que exiva as informações do pet selecionado", async () => {


        const component = mount(Profile, {
            global: {
                mocks: {
                    $router: mockRoute
                }
            }
        })

        await flushPromises

        expect(component.text()).toContain("Raça: Vira-Lata")
    })

    it("espera-se que ao submeter o formulario, seja enviados os dados corretamente", async () => {

        const adoptPet = vi.spyOn(PetService, 'adoptPet').mockResolvedValue()

        const component = mount(Profile, {
            global: {
                mocks: {
                    $router: mockRoute
                }
            }
        })
        await flushPromises

        component.get("[data-test='input-name']").setValue("diego batista")
        component.get("[data-test='input-contact']").setValue("31991625555")
        component.get("[data-test='input-email']").setValue("diego2gmail.com")
        component.get("[data-test='input-observations']").setValue("quero um cachorro")

        component.get("[data-test='input-submit-button']").trigger("submit")

        expect(adoptPet).toBeCalledWith({

            name: 'diego batista',
            email: 'diego@gmail.com',
            contact: '31991625555',
            observations: 'quero um cachorro',
        })
    })

})