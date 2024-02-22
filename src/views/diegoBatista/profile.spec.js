import { flushPromises, mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import Profile from "./Profile.vue";
import PetService from "@/services/PetService";


describe('tela de perfil dos pets', () => {

    const mockRoute = {
        params: {
            id: '2'
        }
    }

    vi.spyOn(PetService, 'getOnePet').mockResolvedValue([
        {
            name: "Magu",
            race: {
                name: "Xita"
            },
            specie: {
                name: "Macaco" 
            },
            age: "3", 
            weight: "5", 
            size: "MEDIUM"
        }
    ])

    it("espera-se que a tela seja renderizada", () => {

        const component = mount(Profile, {
            global: {
                mocks: {
                    $route: mockRoute
                }
            }
        })

        expect(component).toBeTruthy()
    })

    it("espera-se que exiba as informações do pet selecionado", async () => {

        vi.spyOn(PetService, 'getOnePet').mockResolvedValue({
            name: "Magu",
            race: {
                name: "Xita"
            },
            specie: {
                name: "Macaco" 
            },
            age: "3", 
            weight: "5", 
            size: "MEDIUM" 
        });

        const component = mount(Profile, {
            global: {
                mocks: {
                    $route: mockRoute
                }
            }
        })

        await flushPromises()

        expect(component.text()).toContain("Magu")
    })

    it("espera-se que ao submeter o formulario, seja enviados os dados corretamente", async () => {

        const adoptPet = vi.spyOn(PetService, 'adoptPet').mockResolvedValue()

        const component = mount(Profile, {
            global: {
                mocks: {
                    $route: mockRoute
                }
            }
        })
        await flushPromises()

        component.get("[data-test='name']").setValue("diego batista")
        component.get("[data-test='contact']").setValue("31991625555")
        component.get("[data-test='email']").setValue("diego@gmail.com")
        component.get("[data-test='observations']").setValue("quero um cachorro")

        component.get("[data-test='submit-button']").trigger("submit")

        await flushPromises()
        expect(adoptPet).toBeCalledWith({

            name: 'diego batista',
            email: 'diego@gmail.com',
            contact: '31991625555',
            observations: 'quero um cachorro',
        })
    })

})