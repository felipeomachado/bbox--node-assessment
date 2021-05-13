import User from "../entities/User";

export class FindUserService {
    async execute(id: string) : Promise<User> {
            const user = await User.findOne({ uuid: id });
            return user;
    }
}