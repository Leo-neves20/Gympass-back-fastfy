import { UserRepository } from "@/repository/prisma";
import {SigninError} from "./error"
import { User } from "@prisma/client";

export class SigninService {
    constructor(private UserRepository: UserRepository){}

    async execute(params: {email: string, password: string}): Promise<User>{
        const {email, password} = params

        const validation = new SigninError(this.UserRepository)

        const user = await validation.emailValidation(email)
        await validation.passwordValidation({password, password_hash: user.password_hash})

        return user
    }
}