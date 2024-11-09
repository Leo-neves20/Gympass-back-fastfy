import { iRegisterRequest } from '@/interfaces/_users.interface';
import { Prisma, type User } from '@prisma/client';
import {UserRepository} from '../prisma/_prisma-user.repository'
import {v4 as uuid} from 'uuid'
import { hash } from 'bcrypt';

export class InMemoryUserRepository implements UserRepository {

    public dataBase: User[] = []
   
    async Create(data: Omit<iRegisterRequest, 'password'> & Pick<Prisma.UserCreateInput, 'password_hash'>): Promise<User> {
        const {name, email, password_hash} = data

        const userDataCreated = {
            id: uuid(),
            name,
            email,
            password_hash,
            created_at: new Date()
        }

        this.dataBase.push(userDataCreated)

        return new Promise((resolve) => resolve(userDataCreated)) 
    }

    async GetByEmail(data: Pick<User, 'email'>): Promise<User | null>{
        const {email} = data
        const user = this.dataBase.find(user => user.email === email)

        if(!user){
            return null
        }

        return new Promise((resolve) => resolve(user)) 
    }

}