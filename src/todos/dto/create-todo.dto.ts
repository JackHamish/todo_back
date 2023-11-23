import { IsNotEmpty, IsNumber, IsString, Max, Min, isNotEmpty } from "class-validator"

export class CreateTodoDto {

    @IsString()
    @IsNotEmpty()
    title: string
    
    @IsNotEmpty()
    @IsNumber()
    @Max(10)
    @Min(1)
    priority: number
}
