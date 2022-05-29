import { TodosEntity } from './todos.models';
import { initialState, todosAdapter, TodosPartialState } from './todos.reducer';
import * as TodosSelectors from './todos.selectors';
import { initialState as initialTasksState, tasksAdapter, TasksPartialState } from '../tasks/tasks.reducer';
import { createTasksEntity } from '../tasks/tasks.selectors.spec';
import { AppState } from '../reducers';

describe('Todos Selectors', () => {
	const ERROR_MSG = 'No Error Available';
	const getTodosId = (it: TodosEntity) => it.id;
	const createTodosEntity = (id: string, name = '', description = '') =>
		({
			id,
			name: name || `name-${id}`,
			description: description || `description-${id}`,
		} as TodosEntity);

	let state: TodosPartialState;
	let tasksState: TasksPartialState;
	let appState: AppState;

	beforeEach(() => {
		state = {
			todos: todosAdapter.setAll(
				[createTodosEntity('TODO-AAA'), createTodosEntity('TODO-BBB'), createTodosEntity('TODO-CCC')],
				{
					...initialState,
					selectedId: 'TODO-BBB',
					error: ERROR_MSG,
					loaded: true,
				}
			),
		};
		tasksState = {
			tasks: tasksAdapter.setAll(
				[
					createTasksEntity('TASK-AAA', 'TODO-AAA'),
					createTasksEntity('TASK-BBB', 'TODO-AAA'),
					createTasksEntity('TASK-CCC', 'TODO-BBB'),
				],
				{
					...initialTasksState,
					selectedId: 'TASK-AAA',
					error: ERROR_MSG,
					loaded: true,
				}
			),
		};
		appState = {
			...state,
			...tasksState,
		};
	});

	describe('Todos Selectors', () => {
		it('getAllTodos() should return the list of Todos', () => {
			const results = TodosSelectors.getAllTodos(state);
			const selId = getTodosId(results[1]);

			expect(results.length).toBe(3);
			expect(selId).toBe('TODO-BBB');
		});

		it('getSelected() should return the selected Entity', () => {
			const result = TodosSelectors.getSelected(state) as TodosEntity;
			const selId = getTodosId(result);

			expect(selId).toBe('TODO-BBB');
		});

		it('getTodosLoaded() should return the current "loaded" status', () => {
			const result = TodosSelectors.getTodosLoaded(state);

			expect(result).toBe(true);
		});

		it('getTodosError() should return the current "error" state', () => {
			const result = TodosSelectors.getTodosError(state);
			expect(result).toBe(ERROR_MSG);
		});

		it('getAllFullTodos() should return all todos denormilized', () => {
			const result = TodosSelectors.getAllFullTodos(appState);
			expect(result.length).toBe(3);
			expect(result[0].tasks.length).toBe(2);
			const expected = ['TASK-AAA', 'TASK-BBB'];
			expect(result[0].tasks.map((t) => t.id)).toEqual(expect.arrayContaining(expected));
		});

		it('getTasksOfSelectedTodo() should return the selected todo denormilized', () => {
			const result = TodosSelectors.getTasksOfSelectedTodo(appState);
			expect(result.length).toBe(1);
			expect(result[0].id).toEqual('TASK-CCC');
		});
	});
});
