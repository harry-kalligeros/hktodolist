import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { LowdbModule } from '../lowdb/lowdb.module';
import { TaskModule } from './task.module';

describe('TaskController', () => {
	let controller: TaskController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [LowdbModule],
			controllers: [TaskController],
			providers: [TaskService],
		}).compile();

		controller = module.get<TaskController>(TaskController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
