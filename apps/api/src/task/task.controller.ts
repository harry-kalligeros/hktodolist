import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
	constructor(private readonly taskService: TaskService) {}

	@Post()
	create(@Body() createTaskDto: CreateTaskDto) {
		return this.taskService.create(createTaskDto);
	}

	@Get(':todoId')
	findAll(@Param('todoId') todoId: string) {
		return this.taskService.find(todoId);
	}

	@Get(':todoId/:id')
	findOne(@Param('todoId') todoId: string, @Param('id') id: string) {
		return this.taskService.findOne(id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
		return this.taskService.update(id, updateTaskDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.taskService.remove(id);
	}
}
