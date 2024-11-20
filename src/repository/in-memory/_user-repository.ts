import { iRegisterRequest } from '@/interfaces/_users.interface';
import { Prisma, type User } from '@prisma/client';
import {UserRepository} from '../prisma/user/index'
import {v4 as uuid} from 'uuid'

export class InMemoryUserRepository implements UserRepository {

    public dataBase: User[] = []
   
    async Create(data: Omit<iRegisterRequest, 'password'> & Pick<Prisma.UserCreateInput, 'password_hash'>): Promise<User> {
        const {name, email, password_hash} = data

        const userDataCreated: User = {
            id: uuid(),
            name,
            email,
            password_hash,
            lang: 'PT_BR',
            theme: 'AUTO',
            created_at: new Date()
        }

        this.dataBase.push(userDataCreated)

        return new Promise((resolve) => resolve(userDataCreated)) 
    }

    async GetByEmail(email: string): Promise<User | null>{
        const user = this.dataBase.find(user => user.email === email)
        return !user ? null : new Promise((resolve) => resolve(user)) 
    }

    async GetById(id: string): Promise<User | null> {
        const user = this.dataBase.find(user => user.id === id)
        return !user ? null : new Promise((resolve) => resolve(user)) 
    }
}