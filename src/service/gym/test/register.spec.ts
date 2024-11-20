import { InMemoryGymRepository } from "@/repository/in-memory/_gym-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GymRegisterService } from "../_register.service";

let GymRepository: InMemoryGymRepository
let sut: GymRegisterService

describe('Gym Register', () => {

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

    it('Should able to register a gym', async () => {
        const gym = await sut.execute(gymMock)
        expect(gym.id).toEqual(expect.any(String))
    })
})