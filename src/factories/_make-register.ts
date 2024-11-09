import { UserRepository } from "@/repository/prisma"
import * as service from "@/service/user"

export const MakeRegister = (): service.UsersRegister => {
    const PrismaRepository = new UserRepository()
    const registerUser = new service.UsersRegister(PrismaRepository)
    return registerUser
}