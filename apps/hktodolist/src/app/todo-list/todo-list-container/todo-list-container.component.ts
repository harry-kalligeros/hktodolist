import { Component, OnInit } from '@angular/core';
import { TodosService } from '@hktodolist/core-data';
import { FullTodo } from '@hktodolist/api-interfaces';
import { EMPTY, Observable } from 'rxjs';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { TasksFacade, TodosFacade } from '@hktodolist/core-state';

@Component({
	selector: 'hk-todo-list-container',
	templateUrl: './todo-list-container.component.html',
	styleUrls: ['./todo-list-container.component.scss'],
})
export class TodoListContainerComponent implements OnInit {
	faPlusCircle = faPlusCircle;
	todoItems$: Observable<FullTodo[]> = EMPTY;
	constructor(private todosFacade: TodosFacade, private tasksFacade: TasksFacade) {
		todosFacade.init();
		tasksFacade.init();
	}

	ngOnInit(): void {
		this.todoItems$ = this.todosFacade.allFullTodos$;
	}
}
