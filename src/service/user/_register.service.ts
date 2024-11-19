import {useInterface} from '@/interfaces'
import { UserRepository } from '@/repository/prisma'
import { hash } from 'bcrypt'
import { type User } from '@prisma/client'
import { UserDataValidation } from './validation'

interface iUserRegisterService {
    execute(params: useInterface.iRegisterRequest): Promise<User>
}

export class UsersRegisterService implements iUserRegisterService {
    constructor(private UserRepository: UserRepository){} 

    async execute(params: useInterface.iRegisterRequest){
        const {name, email, password} = params

        const validation = new UserDataValidation(this.UserRepository)
        await validation.ByEmail(email)
        validation.ByPassword(password)
      
        const password_hash = await hash(password, 6)
    
        const createUser = this.UserRepository.Create({
            name, email, password_hash
        })
      
        return createUser
    }
}
