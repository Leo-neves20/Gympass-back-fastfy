import { AppError } from "@/errors"
import { GymRepository, UserRepository } from "@/repository/prisma"

interface iGymDataExist {
    isGymId(id: string): Promise<boolean>
}

abstract class GymDataExist implements iGymDataExist {
    constructor(protected GymRepository: GymRepository){
        this.GymRepository = GymRepository
    }

    async isGymId(id: string){
        const user = await this.GymRepository.GetById(id)
        return user ? true : false
    }
}

export class GymDataValidation extends GymDataExist {
    async ById(id: string): Promise<void> {
        const gymAlreadyExiste = await this.isGymId(id)

        if(!gymAlreadyExiste){
            throw new AppError('Gym not found', 404)
        }
    }
}



