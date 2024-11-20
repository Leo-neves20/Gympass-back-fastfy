import { InMemoryGymRepository } from "@/repository/in-memory/_gym-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GymRegisterService } from "../_register.service";

let GymRepository: InMemoryGymRepository
let sut: GymRegisterService

describe('Gym List', () => {

    beforeEach(() => {
        GymRepository = new InMemoryGymRepository()
        sut = new GymRegisterService(GymRepository)
    })

    const gymMock = {
        title: 'Acadêmia teste',
        description: "isso é uma acadêmia teste",
        phone: "2140028922",
        longitude:  '000,0000000',
        latitude: '000,0000000'
    }

    it('Should able to list a especific gym', async () => {
        const gym = await sut.execute(gymMock)
        const findGym = await GymRepository.GetById(gym.id)
        
        expect(findGym).not.toBeNull()
        expect(findGym!.title).toEqual('Acadêmia teste')
    })

    it('Should able to get all gyms', async () => {
        await sut.execute(gymMock)
        await sut.execute({...gymMock, title: 'Acadêmia teste 2'})
        
        const gyms = await GymRepository.GetAll()

        expect(gyms).toBeInstanceOf(Array)
        expect(gyms).toHaveLength(2)
        expect(gyms[0].title).toEqual('Acadêmia teste')
        expect(gyms[1].title).toEqual('Acadêmia teste 2')
    })
})