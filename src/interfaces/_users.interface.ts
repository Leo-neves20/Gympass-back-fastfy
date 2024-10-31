import {Prisma} from "@prisma/client"

export interface iRegisterRequest extends Pick<Prisma.UserCreateInput, 'name' | 'email'> {
    password: string
}