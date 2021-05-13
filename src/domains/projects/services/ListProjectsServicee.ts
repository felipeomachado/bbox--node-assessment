import Project from "../entities/Project";

export class ListProjectsService {
    async execute(userId: string) : Promise<Project[]> {
        let projects: Project[];
        if (userId) 
            projects = await Project.find({where: { owner: userId }, relations: ["owner"]});
        else 
            projects = await Project.find({relations: ["owner"]});
            
        return projects;
    }
}