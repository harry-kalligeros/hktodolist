import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as TodosActions from './todos.actions';
import { TodosEntity } from './todos.models';
import { ViewMode } from '@hktodolist/api-interfaces';

export const TODOS_FEATURE_KEY = 'todos';

export interface State extends EntityState<TodosEntity> {
	viewMode: ViewMode;
	selectedId?: string | null; // which Todos record has been selected
	loaded: boolean; // has the Todos list been loaded
	error?: string | null; // last known error (if any)
}

export interface TodosPartialState {
	readonly [TODOS_FEATURE_KEY]: State;
}

export const todosAdapter: EntityAdapter<TodosEntity> = createEntityAdapter<TodosEntity>();

export const initialState: State = todosAdapter.getInitialState({
	// set initial required properties
	viewMode: 'view',
	selectedId: null,
	loaded: false,
});

const todosReducer = createReducer(
	initialState,
	on(TodosActions.init, (state) => ({ ...state, loaded: false, error: null })),
	on(TodosActions.selectTodo, (state, { id }) => ({ ...state, selectedId: id })),
	on(TodosActions.loadTodosSuccess, (state, { todos }) => todosAdapter.setAll(todos, { ...state, loaded: true })),
	on(TodosActions.loadTodosFailure, (state, { error }) => ({ ...state, error })),
	on(TodosActions.toggleViewMode, (state, { viewMode }) => ({ ...state, viewMode }))
);

export function reducer(state: State | undefined, action: Action) {
	return todosReducer(state, action);
}
