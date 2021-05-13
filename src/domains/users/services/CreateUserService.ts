import { CreateUserDto } from "../dto/create-user.dto";
import User, { UserEvent, UserRole } from "../entities/User";
import { v4 as uuidv4 } from "uuid";


export class CreateUserService {
    async execute(createUserDto : CreateUserDto) : Promise<String> {
        const uuid = uuidv4();
        const user: User = User.create({
          uuid,
          firstName: createUserDto.firstName,
          lastName: createUserDto.lastName,
          email: createUserDto.email,
          phoneNumber: createUserDto.phoneNumber,
          password: createUserDto.password,
          role: UserRole.CLIENT,
          creationDate: new Date(),
          currentEvent: UserEvent.CREATION,
        });
        await user.save();

        return uuid;
    }
}