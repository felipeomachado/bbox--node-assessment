import AppError from "../../../errors/AppError";
import User from "../entities/User";

export class DeleteUserService {
    async execute(id: string)  {
        const user = await User.findOne({ uuid: id });
        if(user)
            await User.delete(user);
        else 
            throw new AppError('User not found!', 404);
    }
}