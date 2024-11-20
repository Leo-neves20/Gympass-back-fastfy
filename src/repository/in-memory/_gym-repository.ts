import { type Gym, Prisma } from '@prisma/client';
import {GymRepository} from '../prisma/gym/index'
import { randomUUID } from 'crypto';
import {v4 as uuid} from 'uuid'
import { Decimal } from '@prisma/client/runtime/library';

export class InMemoryGymRepository implements GymRepository {

    public dataBase: Gym[] = []

    Create(data: Omit<Prisma.GymCreateInput, 'id'>): Promise<Gym> {
        const {latitude, longitude, title, Checkin, description = null, phone = null} = data

        const Gym: Gym = {
            id: uuid(),
            title,
            description,
            phone,
            latitude: latitude as Decimal,
            longitude: longitude as Decimal
        }

        this.dataBase.push(Gym)

        return new Promise(resolve => resolve(Gym))
    }

    GetById(id: string): Promise<Gym | null> {
        const gym = this.dataBase.find(gym => gym.id === id)
        return new Promise(resolve => resolve(gym ?? null))
    }

    GetAll(): Promise<Gym[]> {
        return new Promise(resolve => resolve(this.dataBase))
    }
}