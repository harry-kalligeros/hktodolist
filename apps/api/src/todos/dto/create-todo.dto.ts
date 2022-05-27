import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateTodoDto {
	@IsNotEmpty()
	@IsString()
	name: string;

	@IsString()
	@IsOptional()
	description: string;
}
