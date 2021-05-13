import User from "../entities/User";

export class ListUsersService {
    async execute() : Promise<User[]> {
        const users = await User.find();
        return users;
    }
}