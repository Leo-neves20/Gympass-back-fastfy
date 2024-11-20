import { AppError } from "@/errors"
import { UserRepository } from "@/repository/prisma"
import { type User } from "@prisma/client"



interface iUserDataExist {
    isUserId(id: string): Promise<boolean>
    isEmail(email: string): Promise<boolean>
    isCorrectPassword(password: string): boolean
}

class UserDataExist implements iUserDataExist {
    private regexPassword = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*(),.?":{}|<>]{5,}$/

    constructor(protected UserRepository: UserRepository){
        this.UserRepository = UserRepository
    }

    async isUserId(id: string){
        const user = await this.UserRepository.GetById(id)
        return user ? true : false
    }

    async isEmail(email: string){
        const user = await this.UserRepository.GetByEmail(email)
        return user ? true : false 
    }

    isCorrectPassword(password: string){
        return this.regexPassword.test(password)
    }
}

export class UserDataValidation extends UserDataExist {

    async ById(id: string): Promise<void> {
        const userAlreadyExiste = await this.isUserId(id)
        if(!userAlreadyExiste){
            throw new AppError('User not found', 404)
        }
    }

    async ByEmail(email: string): Promise<void> {
        const userAlreadyExiste = await this.isEmail(email) 
        if(userAlreadyExiste){
            throw new AppError('email already taken', 409)
        }
    }
    
    ByPassword(password: string){
        const isRight = this.isCorrectPassword(password)
        if(!isRight) {
            throw new AppError("Password must be at least 5 characters long, contain at least one uppercase letter, one number, and one special character.", 400)  
        }
    }
}



