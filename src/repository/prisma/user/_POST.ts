import { useInterface } from "@/interfaces";
import { prismaClient } from "@/lib";
import { Prisma } from "@prisma/client";

type DataRegisterType = Omit<useInterface.iRegisterRequest, 'password'> & Pick<Prisma.UserCreateInput, 'password_hash'>

interface iPOST {
    Create(data: DataRegisterType): Promise<Prisma.UserCreateInput>
}

export class POST implements iPOST {
    async Create(data: DataRegisterType){
        const response = await prismaClient.user.create({data})
        return response
    }
}
