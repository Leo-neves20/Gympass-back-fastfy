import { prismaClient } from "@/lib"
import { Prisma, type User } from "@prisma/client"

type Class = new (...args: any[]) => any

interface iGET {
    GetByEmail(data: Pick<Prisma.UserCreateInput, "email">): Promise<User | null>
    GetById(params: {id: string}): Promise<User | null>
}

export const GetMexing = <Base extends Class>(base: Base) => class GET extends base implements iGET {

    async GetByEmail(data: Pick<Prisma.UserCreateInput, "email">){
        const {email} = data
        const response = await prismaClient.user.findUnique({
            where: {
                email
            }
        })
        return response
    }

    async GetById(params: {id: string}){
        const {id} = params
        const response = await prismaClient.user.findUnique({
            where: {
                id
            }
        })
        return response
    }
}