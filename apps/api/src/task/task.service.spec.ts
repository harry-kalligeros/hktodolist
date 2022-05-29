import { Test, TestingModule } from '@nestjs/testing';
import { LowdbModule } from '../lowdb/lowdb.module';
import { TaskService } from './task.service';

describe('TaskService', () => {
	let service: TaskService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [LowdbModule],
			providers: [TaskService],
		}).compile();

		service = module.get<TaskService>(TaskService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
