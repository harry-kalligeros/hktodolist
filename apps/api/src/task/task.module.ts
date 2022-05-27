import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { LowdbModule } from '../lowdb/lowdb.module';

@Module({
	imports: [LowdbModule],
	controllers: [TaskController],
	providers: [TaskService],
	exports: [TaskService],
})
export class TaskModule {}
