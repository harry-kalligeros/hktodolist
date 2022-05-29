import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListContainerComponent } from './todo-list-container/todo-list-container.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '../icons/icons.module';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemFormComponent } from './item-form/item-form.component';
import { ShowAddPipe } from './pipes/show-add.pipe';

@NgModule({
	declarations: [TodoListContainerComponent, ItemFormComponent, ItemListComponent, ShowAddPipe],
	imports: [CommonModule, ReactiveFormsModule, IconsModule],
	exports: [TodoListContainerComponent, ItemFormComponent],
})
export class TodoListModule {}
