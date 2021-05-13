import { CreateProjectDto } from "../dto/create-project.dto";
import { v4 as uuidv4 } from "uuid";
import Project from "../entities/Project";
import User from "../../users/entities/User";
import AppError from "../../../errors/AppError";


export class CreateProjectService {
    async execute(createProjectDto : CreateProjectDto) : Promise<String> {
        const uuid = uuidv4();
        const user: User = await User.findOne({ uuid: createProjectDto.userId });

        const userNotFound = user ? false : true;

        if(userNotFound) 
            throw new AppError('User Not Found!', 404);

        const project: Project = Project.create({
            uuid,
            description: createProjectDto.description,
            owner: user,
            creationDate: new Date(),
        });
        await project.save();
        return uuid;
    }
}