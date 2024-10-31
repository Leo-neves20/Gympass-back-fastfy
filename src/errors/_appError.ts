import { env } from "@/env"
import { FastifyReply, FastifyRequest } from "fastify"
import { ZodError } from "zod"

export class AppError extends Error{

    status: number

    constructor(message: string, status: number = 400){
        super(),
        this.message = message
        this.status = status
    }
}

export const handleError = (error: Error, _request: FastifyRequest, replay: FastifyReply) => {
    if(error instanceof ZodError){
        return replay.status(400).send({message: 'invalid request', error: error.format()})
    }

    if(error instanceof AppError){
        return replay.status(error.status).send({message: error.message})
    }

    if(env.NODE_ENV !== 'production'){
        console.error(error)
    }

    return replay.status(500).send({message: 'internal server error'})
}