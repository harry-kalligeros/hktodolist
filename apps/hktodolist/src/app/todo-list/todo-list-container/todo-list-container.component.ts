import { Component, OnInit } from '@angular/core';
import { FullTodo, Task, Todo, ViewMode, UpsertPayload, Facade, DeletePayload } from '@hktodolist/api-interfaces';
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
			if (mode === 'add') {
				this.todosFacade.selectTodo('');
				this.tasksFacade.toggleViewMode('view');
			}
		} else {
			if (mode === 'add') {
				this.tasksFacade.selectTask('');
				this.todosFacade.toggleViewMode('view');
			}
			this.tasksFacade.toggleViewMode(mode);
		}
	}

	upsert(payload: UpsertPayload) {
		const { viewMode, item } = payload;
		const facade = this.getFacade(item);
		switch (viewMode) {
			case 'add':
				facade.addItem(item);
				break;
			case 'edit':
				facade.updateItem(item);
				break;
		}
	}

	delete(payload: DeletePayload) {
		const { type, id } = payload;
		const facade = this.getFacadeByType(type);
		facade.deleteItem(id);
	}

	/**
	 * Returns the proper facade based on a TS type guard
	 * @param item
	 * @private
	 */
	private getFacade(item: Task | Todo): Facade<Todo | Task> {
		if ('todoId' in item) {
			// it is a task
			return this.tasksFacade as Facade<Todo | Task>;
		} else {
			return this.todosFacade as Facade<Todo | Task>;
		}
	}

	/**
	 * Returns the proper facade based on the item type
	 * @param item
	 * @private
	 */
	private getFacadeByType(type: 'todo' | 'task'): Facade<Todo | Task> {
		if (type === 'task') {
			// it is a task
			return this.tasksFacade as Facade<Todo | Task>;
		} else {
			return this.todosFacade as Facade<Todo | Task>;
		}
	}
}
