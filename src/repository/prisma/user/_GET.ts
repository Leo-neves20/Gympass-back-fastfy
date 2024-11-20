import { prismaClient } from "@/lib"
import { Prisma, type User } from "@prisma/client"

type Class = new (...args: any[]) => any

interface iGET {
    GetByEmail(email: string): Promise<User | null>
    GetById(id: string): Promise<User | null>
}

export const GetMixin = <Base extends Class>(base: Base) => class GET extends base implements iGET {

    async GetByEmail(email: string){
        const response = await prismaClient.user.findUnique({
            where: {
                email
            }
        })
        return response
    }

    async GetById(id: string){
        const response = await prismaClient.user.findUnique({
            where: {
                id
            }
        })
        return response
    }
}