import {useInterface} from '@/interfaces'
import { UserRepository } from '@/repository/prisma'
import { hash } from 'bcrypt'
import { RegisterErrors } from './error'

/** 
 * @function Use-Case  
 * @function Service
*/
export class UsersRegister {
    constructor(private UserRepository: UserRepository){} 

    async execute(params: useInterface.iRegisterRequest){
        const {name, email, password} = params

        const validation = new RegisterErrors(this.UserRepository)
        await validation.emailValidationIfExist({email})
        validation.passwordValidation({password})
      
        const password_hash = await hash(password, 6)
    
        const createUser = this.UserRepository.Create({
            name, email, password_hash
        })
      
        return createUser
    }
}
