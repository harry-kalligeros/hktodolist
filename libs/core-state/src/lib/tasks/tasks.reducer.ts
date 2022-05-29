import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as TasksActions from './tasks.actions';
import { TasksEntity } from './tasks.models';
import { Task, ViewMode } from '@hktodolist/api-interfaces';
import * as TodosActions from '../todos/todos.actions';
import { todosAdapter } from '../todos/todos.reducer';

export const TASKS_FEATURE_KEY = 'tasks';

export interface State extends EntityState<TasksEntity> {
	viewMode: ViewMode;
	selectedId?: string | null | undefined; // which Tasks record has been selected
	loaded: boolean; // has the Tasks list been loaded
	error?: string | null; // last known error (if any)
}

export interface TasksPartialState {
	readonly [TASKS_FEATURE_KEY]: State;
}

export const tasksAdapter: EntityAdapter<TasksEntity> = createEntityAdapter<TasksEntity>();

export const initialState: State = tasksAdapter.getInitialState({
	// set initial required properties
	viewMode: 'view',
	selectedId: null,
	loaded: false,
});

const tasksReducer = createReducer(
	initialState,
	on(TasksActions.init, (state) => ({ ...state, loaded: false, error: null })),
	on(TasksActions.selectTask, (state, { id }) => ({ ...state, selectedId: id })),
	on(TasksActions.loadTasksSuccess, (state, { tasks }) => tasksAdapter.setAll(tasks, { ...state, loaded: true })),
	on(TasksActions.loadTasksFailure, (state, { error }) => ({ ...state, error })),
	on(TasksActions.toggleViewMode, (state, { viewMode }) => ({ ...state, viewMode })),
	on(TasksActions.taskAddedSuccess, (state, { task }) => tasksAdapter.addOne(task, state)),
	on(TasksActions.taskUpdatedSuccess, (state, { task }) => tasksAdapter.setOne(task, state)),
	on(TasksActions.taskDeletedSuccess, (state, { id }) => tasksAdapter.removeOne(id, state)),
	on(TodosActions.todoDeletedSuccess, (state, { id }) => {
		const ids = Object.entries(state?.entities)
			.map((entry: [string, Task | undefined]) => entry[1])
			.filter((task: Task | undefined) => task?.todoId === id)
			.map((task: Task | undefined) => task?.id);
		return tasksAdapter.removeMany(ids as string[], state);
	})
);

export function reducer(state: State | undefined, action: Action) {
	return tasksReducer(state, action);
}
