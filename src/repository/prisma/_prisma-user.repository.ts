import {prismaClient} from '@/lib/index'
import {useInterface} from '@/interfaces/index'
import {Prisma, User} from "@prisma/client"

type DataRegisterType = Omit<useInterface.iRegisterRequest, 'password'> & Pick<Prisma.UserCreateInput, 'password_hash'>

interface UserRepositoryInterface {
    Create(data: DataRegisterType): Promise<Prisma.UserCreateInput>
    GetByEmail(data: Pick<Prisma.UserCreateInput, "email">): Promise<User | null>
}

export class UserRepository implements UserRepositoryInterface {
    async Create(data: DataRegisterType){
        const response = await prismaClient.user.create({data})
        return response
    }

    async GetByEmail(data: Pick<Prisma.UserCreateInput, 'email'>){
        const {email} = data
        const response = await prismaClient.user.findUnique({
            where: {
                email
            }
        })
        return response
    }
}

