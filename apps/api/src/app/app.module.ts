import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from '../todos/todos.module';
import { TaskModule } from '../task/task.module';

@Module({
	imports: [TodosModule, TaskModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
