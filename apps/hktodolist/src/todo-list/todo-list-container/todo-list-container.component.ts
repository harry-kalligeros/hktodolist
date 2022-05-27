import { Component, OnInit } from '@angular/core';
import { TodoService } from '@hktodolist/core-data';
import { FullTodo } from '@hktodolist/api-interfaces';
import { EMPTY, Observable } from 'rxjs';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'hk-todo-list-container',
	templateUrl: './todo-list-container.component.html',
	styleUrls: ['./todo-list-container.component.scss'],
})
export class TodoListContainerComponent {
	faPlusCircle = faPlusCircle;
	todoItems$: Observable<FullTodo[]> = EMPTY;
	constructor(private todoService: TodoService) {
		this.todoItems$ = this.todoService.all();
	}
}
