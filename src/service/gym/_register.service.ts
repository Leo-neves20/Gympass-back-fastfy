import { GymRepository } from "@/repository/prisma";
import { type Gym, Prisma } from "@prisma/client";

interface iGymRegisterService {
    execute(data: Omit<Prisma.GymCreateInput, 'id'>): Promise<Gym>
}

export class GymRegisterService implements iGymRegisterService {

    constructor (private GymRepository: GymRepository){}

    async execute(data: Omit<Prisma.GymCreateInput, "id">): Promise<Gym> {
        const gym = await this.GymRepository.Create(data)
        return gym
    }
}