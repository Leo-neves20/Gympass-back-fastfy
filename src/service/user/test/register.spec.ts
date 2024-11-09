import {expect, describe, it, beforeEach} from 'vitest'
import {InMemoryUserRepository} from '@/repository/in-memory'
import { iRegisterRequest } from '@/interfaces/_users.interface'
import { UsersRegister } from '../_register.service'
import { AppError } from '@/errors'
import { compare } from 'bcrypt'


let UserRepository: InMemoryUserRepository
let sut: UsersRegister

describe('User register', () => {
    beforeEach(() => {
        UserRepository = new InMemoryUserRepository()
        sut = new UsersRegister(UserRepository)
    })

    const userMock: iRegisterRequest = {
        name: 'leo',
        email: 'leo@mail.com',
        password: '@Leo123'
    }

    it('shold create a user', async () =>{
        const user = await sut.execute(userMock)
        expect(user.id).toEqual(expect.any(String))
    })

    it('should not create a user with email already taken', async () =>{
        await sut.execute(userMock)
        await expect(
            sut.execute(userMock)
        ).rejects.toBeInstanceOf(AppError)
    })

    it('shold not create a user password without containing 5 characters, containing at least one uppercase letter, one number and one special character', async () =>{
        await expect(() => 
            sut.execute({...userMock, password: 'leo123'})
        ).rejects.toBeInstanceOf(AppError)
    })

    it('shold not create a user password without hashed', async () =>{
        const user = await sut.execute(userMock)
        await expect(compare(userMock.password, user.password_hash)).resolves.toEqual(true)
    })
})
