import AppError from "../../../errors/AppError";
import Project from "../entities/Project";

export class DeleteProjectService {
    async execute(id: string)  {
        console.log(id);
        const project = await Project.findOne({ uuid: id });
        if(project)
            await Project.delete(project);
        else 
            throw new AppError('Project not found!', 404);
    }
}