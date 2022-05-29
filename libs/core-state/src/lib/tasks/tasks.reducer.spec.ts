import { Action } from '@ngrx/store';

import * as TasksActions from './tasks.actions';
import { TasksEntity } from './tasks.models';
import { State, initialState, reducer } from './tasks.reducer';
import * as TodosActions from '../todos/todos.actions';
import { tasks } from '@hktodolist/fixtures';

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

		it('toggleViewMode should return the view mode', () => {
			const action = TasksActions.toggleViewMode({ viewMode: 'edit' });
			const result: State = reducer(initialState, action);
			expect(result.viewMode).toBe('edit');
		});

		it('taskAddedSuccess should return the added task', () => {
			const task = tasks[0];
			const action = TasksActions.taskAddedSuccess({ task });
			const result: State = reducer(initialState, action);
			expect(result.ids).toEqual([task.id]);
			expect(result.entities).toEqual({ [task.id]: task });
		});

		it('taskUpdatedSuccess should return the updated task', () => {
			let action: Action = TasksActions.loadTasksSuccess({ tasks });
			const state: State = reducer(initialState, action);
			let task = tasks[0];
			const description = 'new description';
			task = { ...task, description };
			action = TasksActions.taskUpdatedSuccess({ task });
			const result: State = reducer(state, action);

			expect(result?.entities?.[task.id]?.description).toBe(description);
		});

		it('taskDeletedSuccess should return the deleted task ', () => {
			let action: Action = TasksActions.loadTasksSuccess({ tasks });
			const state: State = reducer(initialState, action);
			const task = tasks[0];
			action = TasksActions.taskDeletedSuccess({ id: task.id });
			const result: State = reducer(state, action);
			expect(result?.ids?.length).toBe(0);
			expect(result?.entities).toEqual({});
		});

		it('todoDeletedSuccess should remove all tasks with the given todoId from the state', () => {
			let action: Action = TasksActions.loadTasksSuccess({ tasks });
			const state: State = reducer(initialState, action);
			const task = tasks[0];
			action = TodosActions.todoDeletedSuccess({ id: '3f70d660-892b-11ea-ad7e-57f4ce0f7e32' });
			const result: State = reducer(state, action);
			expect(result?.ids?.length).toBe(0);
			expect(result?.entities).toEqual({});
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
