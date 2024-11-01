import {expect, describe, it} from 'vitest'
import {InMemoryUserRepository} from '@/repository/in-memory'
import { iRegisterRequest } from '@/interfaces/_users.interface'
import { UsersRegister } from '../_register.service'
import { AppError } from '@/errors'
import { compare } from 'bcrypt'

describe('User register', () => {

    const userMock: iRegisterRequest = {
        name: 'leo',
        email: 'leo@mail.com',
        password: '@Leo123'
    }

    it('shold create a user', async () =>{
        const UserRepository = new InMemoryUserRepository()
        const RegisterUser = new UsersRegister(UserRepository)
        const user = await RegisterUser.execute(userMock)

        expect(user.id).toEqual(expect.any(String))
    })

    it('should not create a user with email already taken', async () =>{
        const UserRepository = new InMemoryUserRepository()
        const RegisterUser = new UsersRegister(UserRepository)
        await RegisterUser.execute(userMock)

        await expect(() => 
            RegisterUser.execute(userMock)
        ).rejects.toBeInstanceOf(AppError)
    })

    it('shold not create a user password without containing 5 characters, containing at least one uppercase letter, one number and one special character', async () =>{
        const UserRepository = new InMemoryUserRepository()
        const RegisterUser = new UsersRegister(UserRepository)
     
        await expect(() => 
            RegisterUser.execute({...userMock, password: 'leo123'})
        ).rejects.toBeInstanceOf(AppError)
    })

    it('shold not create a user password without hashed', async () =>{
        const UserRepository = new InMemoryUserRepository()
        const RegisterUser = new UsersRegister(UserRepository)
        const user = await RegisterUser.execute(userMock)

        const isPasswordHashed = await compare(userMock.password, user.password_hash)

        expect(isPasswordHashed).toBe(true)
    })

})
