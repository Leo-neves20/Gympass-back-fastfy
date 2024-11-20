import { prismaClient } from "@/lib"
import {Prisma} from "@prisma/client"

interface iPOST {
    Create(data: Omit<Prisma.GymCreateInput, 'id'>): Promise<Prisma.GymCreateInput> 
}

export class POST implements iPOST {
    async Create(data: Omit<Prisma.GymCreateInput, 'id'>){
        const gym = prismaClient.gym.create({data})
        return gym
    }
}