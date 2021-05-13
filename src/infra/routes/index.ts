import { Router } from "express";

import usersRouter from '../../domains/users/routes/users.routes'
import projectRouter from '../../domains/projects/routes/projects.routes'

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/projects', projectRouter);

export default routes

