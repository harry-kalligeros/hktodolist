import { createAction, props } from '@ngrx/store';
import { TodosEntity } from './todos.models';
import { Todo, ViewMode } from '@hktodolist/api-interfaces';

export const init = createAction('[Todos Page] Init');

export const loadTodosSuccess = createAction('[Todos/API] Load Todos Success', props<{ todos: TodosEntity[] }>());

export const loadTodosFailure = createAction('[Todos/API] Load Todos Failure', props<{ error: any }>());

export const selectTodo = createAction('[Todos Page] Select todo', props<{ id: string }>());

export const toggleViewMode = createAction('[Todos Page] Toggle viewMode', props<{ viewMode: ViewMode }>());

export const addTodo = createAction('[Todos/API] Add Todo', props<{ todo: Todo }>());
export const todoAddedSuccess = createAction('[Todos/API] Todo added successfully', props<{ todo: Todo }>());
export const todoAddedFailure = createAction('[Todos/API] Todo not added', props<{ error: any }>());
export const setTodo = createAction('[Todos/API] Set Todo', props<{ todo: Todo }>());
export const todoUpdatedSuccess = createAction('[Todos/API] Todo updated successfully', props<{ todo: Todo }>());
export const todoUpdatedFailure = createAction('[Todos/API] Todo not updated', props<{ error: any }>());
export const deleteTodo = createAction('[Todos/API] Delete Todo', props<{ id: string }>());
export const todoDeletedSuccess = createAction('[Todos/API] Todo deleted successfully', props<{ id: string }>());
export const todoDeletedFailure = createAction('[Todos/API] Todo not deleted', props<{ error: any }>());
