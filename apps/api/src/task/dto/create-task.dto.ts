import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateTaskDto {
	@IsNotEmpty()
	@IsString()
	todoId: string;

	@IsNotEmpty()
	@IsString()
	name: string;

	@IsString()
	@IsOptional()
	description: string;
}
