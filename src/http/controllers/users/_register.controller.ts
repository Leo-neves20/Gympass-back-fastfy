import { FastifyReply, FastifyRequest } from "fastify";
import {z} from 'zod'
import {MakeRegister} from "@/factories"

const usersRegisterBodySchema = z.object({
    name: z.string().nullable(),
    email: z.string().email(),
    password: z.string()
})
/** @function Controller */
export const usersRegister = async (request: FastifyRequest, replay: FastifyReply) => {
    const {name, email, password} = usersRegisterBodySchema.parse(request.body)
    
    const response  = await MakeRegister().execute({
        name,
        email, 
        password
    })

    return replay.status(201).send(response)
} 