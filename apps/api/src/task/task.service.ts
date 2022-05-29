import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CollectionName, Task } from '@hktodolist/api-interfaces';
import { LowdbService } from '../lowdb/lowdb.service';

@Injectable()
export class TaskService {
	collectionName: CollectionName = 'tasks';

	constructor(private readonly lowdbService: LowdbService) {}

	create(createTaskDto: CreateTaskDto) {
		return this.lowdbService.add<Task>(createTaskDto, this.collectionName);
	}

	findAll() {
		return this.lowdbService.findAll<Task>(this.collectionName);
	}

	find(todoId: string) {
		const condition = (item: Task) => item.todoId === todoId;
		return this.lowdbService.find(condition, this.collectionName);
	}

	findOne(id: string) {
		const condition = (item: Task) => item.id === id;
		return this.lowdbService.findOne<Task>(condition, this.collectionName);
	}

	update(id: string, updateTaskDto: UpdateTaskDto) {
		return this.lowdbService.update<Task>('id', id, this.collectionName, updateTaskDto);
	}

	remove(id: string) {
		return this.lowdbService.remove(id, this.collectionName);
	}

	removeMany(ids: string[]) {
		return this.lowdbService.removeMany(ids, this.collectionName);
	}
}
