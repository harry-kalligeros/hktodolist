import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { LowdbService } from '../lowdb/lowdb.service';
import { CollectionName, Todo } from '@hktodolist/api-interfaces';
import { TaskService } from '../task/task.service';

@Injectable()
export class TodosService {
	collectionName: CollectionName = 'todos';

	constructor(private readonly lowdbService: LowdbService, private readonly taskService: TaskService) {}

	/**
	 * Adds a todo to the database
	 * @param createTodoDto
	 */
	create(createTodoDto: CreateTodoDto): Promise<Todo> {
		return this.lowdbService.add<Todo>(createTodoDto, this.collectionName);
	}

	async findAll(): Promise<Todo[]> {
		const todos = await this.lowdbService.findAll<Todo>(this.collectionName);
		return todos;
	}

	findOne(id: string): Promise<Todo> {
		const condition = (item: Todo) => item.id === id;
		return this.lowdbService.findOne<Todo>(condition, this.collectionName);
	}

	update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
		return this.lowdbService.update<Todo>('id', id, this.collectionName, updateTodoDto);
	}

	async remove(id: string): Promise<string> {
		const tasks = await this.taskService.find(id);
		const ids = tasks.map((task) => task.id);
		await this.taskService.removeMany(ids);
		return this.lowdbService.remove(id, this.collectionName);
	}
}
