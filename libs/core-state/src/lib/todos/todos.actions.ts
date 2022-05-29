import { createAction, props } from '@ngrx/store';
import { TodosEntity } from './todos.models';
import { ViewMode } from '@hktodolist/api-interfaces';

export const init = createAction('[Todos Page] Init');

export const loadTodosSuccess = createAction('[Todos/API] Load Todos Success', props<{ todos: TodosEntity[] }>());

export const loadTodosFailure = createAction('[Todos/API] Load Todos Failure', props<{ error: any }>());

export const selectTodo = createAction('[Todos Page] Select todo', props<{ id: string }>());

export const toggleViewMode = createAction('[Todos Page] Toggle viewMode', props<{ viewMode: ViewMode }>());
