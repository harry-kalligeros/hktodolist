import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as TodosActions from './todos.actions';
import * as TodosFeature from './todos.reducer';
import * as TodosSelectors from './todos.selectors';
import { Observable } from 'rxjs';
import { FullTodo } from '@hktodolist/api-interfaces';

@Injectable()
export class TodosFacade {
	/**
	 * Combine pieces of state using createSelector,
	 * and expose them as observables through the facade.
	 */
	loaded$ = this.store.pipe(select(TodosSelectors.getTodosLoaded));
	allTodos$ = this.store.pipe(select(TodosSelectors.getAllTodos));
	selectedTodos$ = this.store.pipe(select(TodosSelectors.getSelected));
	allFullTodos$: Observable<FullTodo[]> = this.store.pipe(select(TodosSelectors.getAllFullTodos));

	constructor(private readonly store: Store) {}

	/**
	 * Use the initialization action to perform one
	 * or more tasks in your Effects.
	 */
	init() {
		this.store.dispatch(TodosActions.init());
	}
}
