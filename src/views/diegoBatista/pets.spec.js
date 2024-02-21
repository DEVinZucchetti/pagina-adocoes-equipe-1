import { flushPromises, mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import Pets from "./Pets.vue";
import PetService from "@/services/PetService";


describe ('tela de listagem de pets', () => {

    vi.spyOn(PetService, 'getAllPets').mockResolvedValue([

     {  id: 1,
        name: "Toto",
        age: 4}
    ])

    it("espera-se que a tela seja renderizada", ()=>{

        const component = mount(Pets)
        
        expect(component).toBeTruthy()
    })
    
    it("espera-se que liste um card para cada pet", async ()=>{

        const component = mount(Pets)
        await flushPromises()

        expect(component.text()).toContain("Toto")

    })

    it("espera-se que navegue para pagina de perfil do pet clicado", async ()=>{

        const mockRouter = {
            push: vi.fn()
        }

        const component = mount(Pets, {
            global :{
                mocks:{
                    $router: mockRouter
                }
            }
        })        
       
        await flushPromises()
        
        component.findAll("[data-test='item-pet']")[0].trigger("click")

        expect(mockRouter.push).toHaveBeenCalledWith('http://localhost:5173/pets-adocao/1/perfil')
    })
})