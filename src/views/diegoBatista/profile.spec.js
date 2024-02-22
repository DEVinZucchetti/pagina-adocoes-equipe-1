import { flushPromises, mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import Profile from "./Profile.vue";
import PetService from "@/services/PetService";


describe ('tela de perfil dos pets', () => {

    const mockRoute = {
        params:{
            id: 1
        }
    }

    vi.spyOn(PetService, 'getOnePet').mockResolvedValue([

    ])

    it("espera-se que a tela seja renderizada", ()=>{

        const component = mount(Profile, {
            global :{
                mocks:{
                    $router: mockRoute
                }
            }   
        })
        
        expect(component).toBeTruthy()
    })    

    it("espera-se que exiva as informações do pet selecionado", async ()=>{

        
        const component = mount(Profile, {
            global :{
                mocks:{
                    $router: mockRoute
                }
            }
        })  
        
        await flushPromises
        
        expect(component.text()).toContain("Raça: Vira-Lata")
    })
    
})