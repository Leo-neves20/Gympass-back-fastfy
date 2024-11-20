import { UserRepository } from "@/repository/prisma";
import {useInterface} from "@/interfaces"
import { User } from "@prisma/client";
import { AppError } from "@/errors";
import { compare } from "bcrypt";

export class SigninError {
    constructor(private UserRepository: UserRepository){}

    async emailValidation(email: string): Promise<User>{
        const UserRepository = this.UserRepository
        const user = await UserRepository.GetByEmail(email)

        if(!user){
            throw new AppError('email ou password wrong')
        }

        return user
    }

    async passwordValidation(params:{password: string, password_hash: string}): Promise<void>{
        const {password, password_hash} = params
        const isTheSame = await compare(password, password_hash)

        if(!isTheSame){
            throw new AppError('email ou password wrong')
        }
    }
}