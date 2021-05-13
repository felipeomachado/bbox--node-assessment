import Project from "../entities/Project";

export class FindProjectService {
    async execute(id: string) : Promise<Project> {
            const project = await Project.findOne({ uuid: id });
            return project;
    }
}