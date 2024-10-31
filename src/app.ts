import fastify from 'fastify';
import * as routes from './http/routes';
import { handleError } from './errors';

export const app = fastify();

app.register(routes.userRoutesResgistry)
app.setErrorHandler(handleError)
