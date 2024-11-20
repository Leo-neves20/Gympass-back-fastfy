import { GymRepository } from "@/repository/prisma";
import { GymDataValidation } from "./validation";
import { Gym } from "@prisma/client";

interface iGymService {
    GetById(id: string): Promise<Gym>
    GetAll(): Promise<Gym[]>
}

export class GymListService implements iGymService {
    constructor (private GymRepository: GymRepository) {}

    async GetById(id: string): Promise<Gym> {
        const validations = new GymDataValidation(this.GymRepository)
        await validations.ById(id)
        return await this.GymRepository.GetById(id) as Gym
    }

    async GetAll(): Promise<Gym[]> {
        return await this.GymRepository.GetAll()
    }
}