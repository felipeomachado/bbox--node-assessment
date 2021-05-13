import { validate } from "class-validator";
import { Request, Response, Router } from "express";
import CustomRequest from "../../../infra/http/CustomRequest";
import { CreateProjectDto } from "../dto/create-project.dto";
import { CreateProjectService } from "../services/CreateProjectService";
import { DeleteProjectService } from "../services/DeleteProjectService";
import { FindProjectService } from "../services/FindProjectService";
import { ListProjectsService } from "../services/ListProjectsServicee";

const projectRouter = Router();

projectRouter.post('/', async (request: CustomRequest<CreateProjectDto>, response: Response) => {
    const { description, userId } = request.body
    const createProjectDto  = new CreateProjectDto (
      description, userId
    )
    const validationErrors = await validate(createProjectDto);
  
    const hasValidationErros = validationErrors.length > 0;
    if(hasValidationErros) {
      return response.status(400).json(validationErrors.map(v => v.constraints));
    }else {
      try {
        const createProjectService  = new CreateProjectService();
        const uuidProjectGenerated = await createProjectService.execute(createProjectDto); 
        return response.status(201).json({ id: uuidProjectGenerated });
      }catch(ex) {
        return response.status(404).json(ex);
      }
    }
});

projectRouter.get("/", async (request: Request, response: Response) => {
  const { userId } = request.query;
  
  const listProjectsService = new ListProjectsService();
  let projects = await listProjectsService.execute(userId ? userId.toString() : undefined);
  return response.status(200).json(projects);
});

projectRouter.get("/:projectId", async (request: Request, response: Response) => {
  const findProjectService = new FindProjectService();
  const project = await findProjectService.execute(request.params.projectId);
  if (project) 
      return response.status(200).json(project);
  else 
      return response.status(404).json({ message: "Project not found!" });
});

projectRouter.delete("/:projectId", async (request, response) => {
  const deleteProjectService = new DeleteProjectService()
  try {
    await deleteProjectService.execute(request.params.projectId);
    return response.sendStatus(204);
  } catch (ex) {
    return response.status(404).json(ex);
  }
});

export default projectRouter;