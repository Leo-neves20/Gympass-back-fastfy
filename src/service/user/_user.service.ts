import { UserRepository } from "@/repository/prisma";
import { type User  } from "@prisma/client";
import { UserDataValidation } from "./validation";

interface iUserService {
    GetById(userId: string): Promise<User>
}

export class UserService implements iUserService {

    constructor(private UserRepository: UserRepository){}

    async GetById(userId: string){
        const userValidations = new UserDataValidation(this.UserRepository)
        await userValidations.ById(userId)
        
        const user = await this.UserRepository.GetById(userId) as User

        return user 
    }
}