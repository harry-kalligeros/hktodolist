import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { LowdbModule } from '../lowdb/lowdb.module';
import { TaskModule } from '../task/task.module';

describe('TodosService', () => {
	let service: TodosService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [LowdbModule, TaskModule],
			providers: [TodosService],
		}).compile();

		service = module.get<TodosService>(TodosService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
