import { Action } from '@ngrx/store';

import * as TodosActions from './todos.actions';
import { TodosEntity } from './todos.models';
import { initialState, reducer, State } from './todos.reducer';
import * as TodoActions from '../todos/todos.actions';
import { todos } from '@hktodolist/fixtures';

describe('Todos Reducer', () => {
	const createTodosEntity = (id: string, name = '', description = ''): TodosEntity => ({
		id,
		name: name || `name-${id}`,
		description: description || `description-${id}`,
	});

	describe('valid Todos actions', () => {
		it('loadTodosSuccess should return the list of known Todos', () => {
			const todos = [createTodosEntity('TODO-AAA'), createTodosEntity('TODO-zzz')];
			const action = TodosActions.loadTodosSuccess({ todos });

			const result: State = reducer(initialState, action);

			expect(result.loaded).toBe(true);
			expect(result.ids.length).toBe(2);
		});

		it('toggleViewMode should change the Todos view mode', () => {
			const action = TodosActions.toggleViewMode({ viewMode: 'edit' });
			const result: State = reducer(initialState, action);

			expect(result.viewMode).toBe('edit');
		});

		it('todoAddedSuccess should return the added todo', () => {
			const todo = todos[0];
			const action = TodoActions.todoAddedSuccess({ todo });
			const result: State = reducer(initialState, action);
			expect(result.ids).toEqual([todo.id]);
			expect(result.entities).toEqual({ [todo.id]: todo });
		});

		it('todoUpdatedSuccess should return the updated todo', () => {
			let action: Action = TodoActions.loadTodosSuccess({ todos });
			const state: State = reducer(initialState, action);
			let todo = todos[0];
			const description = 'new description';
			todo = { ...todo, description };
			action = TodoActions.todoUpdatedSuccess({ todo });
			const result: State = reducer(state, action);

			expect(result?.entities?.[todo.id]?.description).toBe(description);
		});

		it('todoDeletedSuccess should return the deleted todo ', () => {
			let action: Action = TodoActions.loadTodosSuccess({ todos });
			const state: State = reducer(initialState, action);
			const todo = todos[0];
			action = TodoActions.todoDeletedSuccess({ id: todo.id });
			const result: State = reducer(state, action);
			expect(result?.ids?.length).toBe(1);
			expect(result?.entities).toEqual({ [todos[1].id]: todos[1] });
		});
	});

	describe('unknown action', () => {
		it('should return the previous state', () => {
			const action = {} as Action;

			const result = reducer(initialState, action);

			expect(result).toBe(initialState);
		});
	});
});
