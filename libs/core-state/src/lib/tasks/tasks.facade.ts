import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';
import { ViewMode } from 'libs/api-interfaces/src/lib/api-interfaces';

import * as TasksActions from './tasks.actions';
import * as TasksFeature from './tasks.reducer';
import * as TasksSelectors from './tasks.selectors';

@Injectable()
export class TasksFacade {
	/**
	 * Combine pieces of state using createSelector,
	 * and expose them as observables through the facade.
	 */
	loaded$ = this.store.pipe(select(TasksSelectors.getTasksLoaded));
	allTasks$ = this.store.pipe(select(TasksSelectors.getAllTasks));
	selectedTask$ = this.store.pipe(select(TasksSelectors.getSelected));
	selectedTaskId$ = this.store.pipe(select(TasksSelectors.getSelectedId));
	viewMode$ = this.store.pipe(select(TasksSelectors.getViewMode));

	constructor(private readonly store: Store) {}

	/**
	 * Use the initialization action to perform one
	 * or more tasks in your Effects.
	 */
	init() {
		this.store.dispatch(TasksActions.init());
	}

	selectTask(id: string) {
		this.store.dispatch(TasksActions.selectTask({ id }));
	}

	toggleViewMode(mode: ViewMode) {
		this.store.dispatch(TasksActions.toggleViewMode({ viewMode: mode }));
	}
}
