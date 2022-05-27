import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { LowdbModule } from '../lowdb/lowdb.module';
import { TaskModule } from '../task/task.module';

@Module({
	imports: [LowdbModule, TaskModule],
	controllers: [TodosController],
	providers: [TodosService],
})
export class TodosModule {}
