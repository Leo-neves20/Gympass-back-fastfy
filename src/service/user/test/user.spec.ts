import { InMemoryUserRepository } from "@/repository/in-memory";

import { beforeEach, describe, expect, it } from "vitest";
import { UserService } from "../_user.service";
import { AppError } from "@/errors";
import { hash } from "bcrypt";

let UserRepository: InMemoryUserRepository
let sut: UserService
let userId: string
let userName: string

describe('user routes', () => {

    beforeEach(async () => {
        UserRepository = new InMemoryUserRepository()
        sut = new UserService(UserRepository)

        const user = await UserRepository.Create({
            name:"Leonardo Neves",
            email: "leo@mail.com",
            password_hash: await hash('@Leonardo1233', 6)
        })

        userId = user.id
        userName = user.name!

    })
 
    it('Should able to find a user by id', async () => { 
        const user = await sut.GetById(userId)
        expect(user.name).toEqual(userName)
    })

    it('Should not able to find a user with invalid id', async () => {
        await expect(sut.GetById('1234')).rejects.toBeInstanceOf(AppError)
    })
})