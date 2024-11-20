import {type Gym, Prisma} from "@prisma/client"
import {prismaClient} from "@/lib"

type Class = new (...args: any[]) => any

interface iGet {
    GetById(id: string): Promise<Gym | null>
    GetAll(): Promise<Gym[]>
}

export const GetMixin = <Base extends Class>(base: Base) => class GET extends base implements iGet {
    async GetById(id: string){
        return await prismaClient.gym.findUnique({
            where: {id}
        })
    }
    async GetAll(){
        return await prismaClient.gym.findMany()
    } 
}
