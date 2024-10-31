import { AppError } from "@/errors";
import { UserRepository } from "@/repository/prisma";

interface iRegisterErros{
    emailValidationIfExist: (params: {email: string}) => Promise<void>
    passwordValidation: (params: {password: string}) => void
}

export class RegisterErrors implements iRegisterErros {
    private regexPassword = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*(),.?":{}|<>]{5,}$/

    constructor(private UserRepository: UserRepository){
        this.regexPassword
    } 
    
    async  emailValidationIfExist(params: {email: string}): Promise<void> {
        const {email} = params
        
        const user = await this.UserRepository.GetByEmail({email})
        
        if(user){
            throw new AppError('user already existe', 409)
        }
    }
    
    passwordValidation(params: { password: string; }){
        const {password} = params

        if(!this.regexPassword.test(password)){
            throw new AppError("Password must be at least 5 characters long, contain at least one uppercase letter, one number, and one special character.", 400)
        }
    }
  
        
    
}