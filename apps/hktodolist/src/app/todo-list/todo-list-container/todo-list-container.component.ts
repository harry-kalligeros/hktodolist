import { Component, OnInit } from '@angular/core';
import { FullTodo, Task, Todo, ViewMode } from '@hktodolist/api-interfaces';
import { Observable } from 'rxjs';
import { TasksFacade, TodosFacade } from '@hktodolist/core-state';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'hk-todo-list-container',
	templateUrl: './todo-list-container.component.html',
	styleUrls: ['./todo-list-container.component.scss'],
})
export class TodoListContainerComponent implements OnInit {
	faPlusCircle = faPlusCircle;
	todos$: Observable<FullTodo[]>;
	tasks$: Observable<Task[]>;
	selectedTodoId$: Observable<string | null | undefined>;
	selectedTaskId$: Observable<string | null | undefined>;
	selectedTodo$: Observable<Todo | undefined>;
	selectedTask$: Observable<Task | undefined>;
	todoViewMode$: Observable<ViewMode>;
	taskViewMode$: Observable<ViewMode>;

	constructor(private todosFacade: TodosFacade, private tasksFacade: TasksFacade) {
		todosFacade.init();
		tasksFacade.init();
	}

	ngOnInit(): void {
		this.todos$ = this.todosFacade.allFullTodos$;
		this.selectedTodoId$ = this.todosFacade.selectedTodoId$;
		this.selectedTodo$ = this.todosFacade.selectedTodo$;
		this.selectedTaskId$ = this.tasksFacade.selectedTaskId$;
		this.selectedTask$ = this.tasksFacade.selectedTask$;
		this.tasks$ = this.todosFacade.tasks$;
		this.todoViewMode$ = this.todosFacade.viewMode$;
		this.taskViewMode$ = this.tasksFacade.viewMode$;
	}

	selectTodoHandler(id: string) {
		this.todosFacade.selectTodo(id);
	}
	selectTaskHandler(id: string) {
		this.tasksFacade.selectTask(id);
	}

	toggleViewMode(mode: ViewMode, type: 'todo' | 'task') {
		if (type === 'todo') {
			this.todosFacade.toggleViewMode(mode);
		} else {
			this.tasksFacade.toggleViewMode(mode);
		}
	}
}
