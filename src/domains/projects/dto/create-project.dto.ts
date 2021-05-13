import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateProjectDto {
    @IsNotEmpty()
    description: string;
    @IsUUID()
    userId: string;

    constructor(description: string, userId: string) {
        this.description = description;
        this.userId = userId;
    }
}