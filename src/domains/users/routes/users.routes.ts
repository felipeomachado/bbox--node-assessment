import { validate } from "class-validator";
import { Router } from "express";
import CustomRequest from "../../../infra/http/CustomRequest";
import { CreateUserDto } from "../dto/create-user.dto";
import { CreateUserService } from "../services/CreateUserService";
import { DeleteUserService } from "../services/DeleteUserService";
import { FindUserService } from "../services/FindUserService";
import { ListUsersService } from "../services/ListUsersService";

const usersRouter = Router();

usersRouter.post('/', async (request: CustomRequest<CreateUserDto>, response) => {
  const { firstName, lastName, email, phoneNumber, password } = request.body
  const createUserDto  = new CreateUserDto (
    firstName, lastName, email, phoneNumber, password
  )

  const validationErrors = await validate(createUserDto);

  const hasValidationErros = validationErrors.length > 0;
  if(hasValidationErros) {
    response.status(400).json(validationErrors.map(v => v.constraints));
  }else {
    const createUserService  = new CreateUserService();
    const uuidUserInserted = await createUserService.execute(createUserDto); 
    response.status(201).json({ id: uuidUserInserted });
  }
});

usersRouter.get('/', async (request , response) => {
    const listUsersService  = new ListUsersService();
    const users = await listUsersService.execute();
    response.status(200).json(users);
});

usersRouter.get("/:id", async (request, response) => {
    const findUserService = new FindUserService();
    const user = await findUserService.execute(request.params.id);
    if (user) 
        response.status(200).json(user);
    else 
        response.status(404).json({ message: "User not found!" });
  });

  usersRouter.delete("/:id", async (request, response) => {
      const deleteUserService = new DeleteUserService();
      try {
        await deleteUserService.execute(request.params.id);
        response.sendStatus(204);
      } catch (ex) {
        response.status(404).json(ex);
      }
  });

export default usersRouter;