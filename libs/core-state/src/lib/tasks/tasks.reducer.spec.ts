import { Action } from '@ngrx/store';

import * as TasksActions from './tasks.actions';
import { TasksEntity } from './tasks.models';
import { State, initialState, reducer } from './tasks.reducer';

describe('Tasks Reducer', () => {
	const createTasksEntity = (id: string, todoId: string, name = '', description = ''): TasksEntity => ({
		id,
		todoId,
		name: name || `name-${id}`,
		description: description || `description-${id}`,
	});

	describe('valid Tasks actions', () => {
		it('loadTasksSuccess should return the list of known Tasks', () => {
			const tasks = [createTasksEntity('TASK-AAA', 'TODO-AAA'), createTasksEntity('TASK-BBB', 'TODO-AAA')];
			const action = TasksActions.loadTasksSuccess({ tasks });

			const result: State = reducer(initialState, action);

			expect(result.loaded).toBe(true);
			expect(result.ids.length).toBe(2);
		});

		it('loadTasksError should return the error from the backend', () => {
			const error = new Error('bad request');
			const action = TasksActions.loadTasksFailure({ error });

			const result: State = reducer(initialState, action);

			expect(result.loaded).toBe(false);
			expect(result.error).toBe(error);
		});

		it('selectTask should return the selectedId', () => {
			const action = TasksActions.selectTask({ id: 'TASK-AAA' });
			const result: State = reducer(initialState, action);

			expect(result.selectedId).toBe('TASK-AAA');
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
