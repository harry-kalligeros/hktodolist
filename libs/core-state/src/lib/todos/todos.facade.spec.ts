import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as TodosActions from './todos.actions';
import { TodosEffects } from './todos.effects';
import { TodosFacade } from './todos.facade';
import { TodosEntity } from './todos.models';
import { reducer, State, TODOS_FEATURE_KEY } from './todos.reducer';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { endpoints, TodosService } from '@hktodolist/core-data';
import { todos } from '@hktodolist/fixtures';

interface TestSchema {
	todos: State;
}

describe('TodosFacade', () => {
	let facade: TodosFacade;
	let store: Store<TestSchema>;
	let httpMock: HttpTestingController;
	const createTodosEntity = (id: string, name = '', description = ''): TodosEntity => ({
		id,
		name: name || `name-${id}`,
		description: description || `description-${id}`,
	});

	describe('used in NgModule', () => {
		beforeEach(() => {
			@NgModule({
				imports: [StoreModule.forFeature(TODOS_FEATURE_KEY, reducer), EffectsModule.forFeature([TodosEffects])],
				providers: [TodosFacade],
			})
			class CustomFeatureModule {}

			@NgModule({
				imports: [
					NxModule.forRoot(),
					StoreModule.forRoot({}),
					EffectsModule.forRoot([]),
					CustomFeatureModule,
					HttpClientTestingModule,
				],
				providers: [TodosService],
			})
			class RootModule {}
			TestBed.configureTestingModule({ imports: [RootModule] });

			store = TestBed.inject(Store);
			facade = TestBed.inject(TodosFacade);
			httpMock = TestBed.inject(HttpTestingController);
		});

		afterEach(() => {
			httpMock.verify();
		});

		/**
		 * The initially generated facade::loadAll() returns empty array
		 */
		it('loadAll() should return empty list with loaded == true', async () => {
			let list = await readFirst(facade.allTodos$);
			let isLoaded = await readFirst(facade.loaded$);

			expect(list.length).toBe(0);
			expect(isLoaded).toBe(false);

			facade.init();
			const request = httpMock.expectOne(endpoints.TODOS_API);
			request.flush(todos);

			list = await readFirst(facade.allTodos$);
			isLoaded = await readFirst(facade.loaded$);

			expect(list.length).toBe(2);
			expect(isLoaded).toBe(true);
		});

		/**
		 * Use `loadTodosSuccess` to manually update list
		 */
		it('allTodos$ should return the loaded list; and loaded flag == true', async () => {
			let list = await readFirst(facade.allTodos$);
			let isLoaded = await readFirst(facade.loaded$);

			expect(list.length).toBe(0);
			expect(isLoaded).toBe(false);

			store.dispatch(
				TodosActions.loadTodosSuccess({
					todos: [createTodosEntity('AAA'), createTodosEntity('BBB')],
				})
			);

			list = await readFirst(facade.allTodos$);
			isLoaded = await readFirst(facade.loaded$);

			expect(list.length).toBe(2);
			expect(isLoaded).toBe(true);
		});

		it('selectedTodo() should set the selected task and selectedTodo$ should observe it', async () => {
			let selectedTodoId = await readFirst(facade.selectedTodoId$);
			expect(selectedTodoId).toBeNull();

			facade.selectTodo('TODO-ID-1');

			selectedTodoId = await readFirst(facade.selectedTodoId$);
			expect(selectedTodoId).toBe('TODO-ID-1');
		});

		it('toggleViewMode() should set the current viewMode and viewMode$ should observe it', async () => {
			let viewMode = await readFirst(facade.viewMode$);
			expect(viewMode).toBe('view');

			facade.toggleViewMode('edit');
			viewMode = await readFirst(facade.viewMode$);
			expect(viewMode).toBe('edit');
		});

		it('addItem() should add an item', async () => {
			store.dispatch(
				TodosActions.loadTodosSuccess({
					todos,
				})
			);
			const todo = createTodosEntity('AAA');
			facade.addItem(todo);
			const request = httpMock.expectOne(endpoints.TODOS_API);
			request.flush(todo);
			const list = await readFirst(facade.allTodos$);
			expect(list.length).toBe(3);
			expect(list[2]).toBe(todo);
		});

		it('updateItem() should update an item', async () => {
			store.dispatch(
				TodosActions.loadTodosSuccess({
					todos,
				})
			);
			const oldTask = todos[0];
			const todo = { ...todos[0], description: 'new description' };
			facade.updateItem(todo);
			const request = httpMock.expectOne(endpoints.TODOS_API + '/' + todo.id);
			request.flush({ ...oldTask, dataUpdate: todo });
			const list = await readFirst(facade.allTodos$);
			expect(list.length).toBe(2);
			expect(list[0]).toBe(todo);
		});

		it('deleteItem() should delete an item', async () => {
			store.dispatch(
				TodosActions.loadTodosSuccess({
					todos,
				})
			);
			const todo = todos[0];
			facade.deleteItem(todo.id);
			const request = httpMock.expectOne(endpoints.TODOS_API + '/' + todo.id);
			request.flush(todo.id);
			const list = await readFirst(facade.allTodos$);
			expect(list.length).toBe(1);
		});
	});
});
