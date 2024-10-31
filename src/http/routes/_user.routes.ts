import { FastifyInstance } from "fastify";
import * as controllers from "../controllers/users";

export const userRoutesResgistry = (app: FastifyInstance) => {
    app.post('/user/register', controllers.usersRegister)
}