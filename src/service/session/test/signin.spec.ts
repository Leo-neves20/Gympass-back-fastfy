import { beforeEach, describe, expect, it } from "vitest";
import {InMemoryUserRepository} from "@/repository/in-memory"
import {SigninService} from "@/service/session"
import { hash } from "bcrypt";
import { AppError } from "@/errors";

let UserRepository: InMemoryUserRepository
let sut: SigninService

describe('User Signin', () => {

    beforeEach(async () => {
        UserRepository = new InMemoryUserRepository
        sut = new SigninService(UserRepository)

        UserRepository.Create({
            name: "Leonardo",
            email: "leo@mail.com",
            password_hash: await hash("@Leonardo123", 6)
        })
    })

    const userMock ={ 
        email: "leo@mail.com",
        password: "@Leonardo123"
    }

    it('Should able to signin', async () => {
        const signin =  await sut.execute(userMock)
        expect(signin.id).toEqual(expect.any(String))
    })

    it('Should not able to signin with wrong email', async () => {
        expect(async () => await sut.execute({...userMock, email: "leoanrdo@mail.com"})).rejects.toBeInstanceOf(AppError)
    })

    it('Should not able to signin with wrong password', async () => {
        expect(async () => await sut.execute({...userMock, password: "123"})).rejects.toBeInstanceOf(AppError)
    })
})