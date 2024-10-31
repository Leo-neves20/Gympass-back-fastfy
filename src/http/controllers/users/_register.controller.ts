import { FastifyReply, FastifyRequest } from "fastify";
import {z} from 'zod'
import * as service from '@/service/user'
import { UserRepository } from "@/repository/prisma";

const usersRegisterBodySchema = z.object({
    name: z.string().nullable(),
    email: z.string().email(),
    password: z.string()
})
/** @function Controller */
export const usersRegister = async (request: FastifyRequest, replay: FastifyReply) => {
    const {name, email, password} = usersRegisterBodySchema.parse(request.body)

    const PrismaRepository = new UserRepository()
    const registerUser = new service.UsersRegister(PrismaRepository)

    const response  = await registerUser.execute({
        name,
        email, 
        password
    })

    return replay.status(201).send(response)
} 