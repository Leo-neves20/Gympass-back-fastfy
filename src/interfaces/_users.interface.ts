import type {User} from "@prisma/client"

export interface iRegisterRequest extends Pick<User, 'name' | 'email'> {
    password: string
}