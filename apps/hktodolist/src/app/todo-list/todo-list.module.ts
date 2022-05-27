import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListContainerComponent } from './todo-list-container/todo-list-container.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '../icons/icons.module';
import { TodoListComponent } from './todo-list/todo-list.component';

@NgModule({
	declarations: [TodoListContainerComponent, TodoFormComponent, TodoListComponent],
	imports: [CommonModule, ReactiveFormsModule, IconsModule],
	exports: [TodoListContainerComponent, TodoFormComponent],
})
export class TodoListModule {}
