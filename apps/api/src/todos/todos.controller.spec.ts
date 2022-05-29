import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { LowdbService } from '../lowdb/lowdb.service';
import { LowdbModule } from '../lowdb/lowdb.module';
import { TaskModule } from '../task/task.module';

describe('TodosController', () => {
	let controller: TodosController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [LowdbModule, TaskModule],
			controllers: [TodosController],
			providers: [TodosService],
		}).compile();

		controller = module.get<TodosController>(TodosController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
