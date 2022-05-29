import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as TodosActions from './todos.actions';
import * as TodosSelectors from './todos.selectors';
import { Observable } from 'rxjs';
import { FullTodo, Task, Todo, ViewMode } from '@hktodolist/api-interfaces';

@Injectable()
export class TodosFacade {
	/**
	 * Combine pieces of state using createSelector,
	 * and expose them as observables through the facade.
	 */
	loaded$ = this.store.pipe(select(TodosSelectors.getTodosLoaded));
	allTodos$ = this.store.pipe(select(TodosSelectors.getAllTodos));
	selectedTodo$: Observable<Todo | undefined> = this.store.pipe(select(TodosSelectors.getSelected));
	selectedTodoId$: Observable<string | null | undefined> = this.store.pipe(select(TodosSelectors.getSelectedId));
	allFullTodos$: Observable<FullTodo[]> = this.store.pipe(select(TodosSelectors.getAllFullTodos));
	tasks$: Observable<Task[]> = this.store.select(TodosSelectors.getTasksOfSelectedTodo);
	viewMode$: Observable<ViewMode> = this.store.select(TodosSelectors.getViewMode);
	constructor(private readonly store: Store) {}

	/**
	 * Use the initialization action to perform one
	 * or more tasks in your Effects.
	 */
	init() {
		this.store.dispatch(TodosActions.init());
	}

	selectTodo(id: string) {
		this.store.dispatch(TodosActions.selectTodo({ id }));
	}

	toggleViewMode(mode: ViewMode) {
		this.store.dispatch(TodosActions.toggleViewMode({ viewMode: mode }));
	}
}
