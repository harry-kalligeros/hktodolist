import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as TasksActions from './tasks.actions';
import { TasksEffects } from './tasks.effects';
import { TasksFacade } from './tasks.facade';
import { TasksEntity } from './tasks.models';
import { reducer, State, TASKS_FEATURE_KEY } from './tasks.reducer';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { endpoints } from '@hktodolist/core-data';
import { tasks } from '@hktodolist/fixtures';
import { Task } from '@hktodolist/api-interfaces';

interface TestSchema {
	tasks: State;
}

describe('TasksFacade', () => {
	let facade: TasksFacade;
	let store: Store<TestSchema>;
	let httpMock: HttpTestingController;
	const createTasksEntity = (id: string, name = '', todoId = ''): TasksEntity => ({
		id,
		todoId: todoId || `todoId-${todoId}`,
		name: name || `name-${id}`,
	});

	describe('used in NgModule', () => {
		beforeEach(() => {
			@NgModule({
				imports: [
					StoreModule.forFeature(TASKS_FEATURE_KEY, reducer),
					EffectsModule.forFeature([TasksEffects]),
					HttpClientTestingModule,
				],
				providers: [TasksFacade],
			})
			class CustomFeatureModule {}

			@NgModule({
				imports: [NxModule.forRoot(), StoreModule.forRoot({}), EffectsModule.forRoot([]), CustomFeatureModule],
			})
			class RootModule {}

			TestBed.configureTestingModule({ imports: [RootModule], teardown: { destroyAfterEach: false } });

			store = TestBed.inject(Store);
			facade = TestBed.inject(TasksFacade);
			httpMock = TestBed.inject(HttpTestingController);
		});

		/**
		 * The initially generated facade::loadAll() returns empty array
		 */
		it('loadAll() should return empty list with loaded == true', async () => {
			let list = await readFirst(facade.allTasks$);
			let isLoaded = await readFirst(facade.loaded$);

			expect(list.length).toBe(0);
			expect(isLoaded).toBe(false);

			facade.init();
			const request = httpMock.expectOne(endpoints.TASKS_API);
			request.flush(tasks);
			list = await readFirst(facade.allTasks$);
			isLoaded = await readFirst(facade.loaded$);

			expect(list.length).toBe(1);
			expect(isLoaded).toBe(true);
		});

		/**
		 * Use `loadTasksSuccess` to manually update list
		 */
		it('allTasks$ should return the loaded list; and loaded flag == true', async () => {
			let list = await readFirst(facade.allTasks$);
			let isLoaded = await readFirst(facade.loaded$);

			expect(list.length).toBe(0);
			expect(isLoaded).toBe(false);

			store.dispatch(
				TasksActions.loadTasksSuccess({
					tasks: [createTasksEntity('AAA'), createTasksEntity('BBB')],
				})
			);

			list = await readFirst(facade.allTasks$);
			isLoaded = await readFirst(facade.loaded$);

			expect(list.length).toBe(2);
			expect(isLoaded).toBe(true);
		});

		it('selectedTask() should set the selected task and selectedTask$ should observe it', async () => {
			let selectedTaskId = await readFirst(facade.selectedTaskId$);
			expect(selectedTaskId).toBeNull();

			facade.selectTask('TASK-ID-1');

			selectedTaskId = await readFirst(facade.selectedTaskId$);
			expect(selectedTaskId).toBe('TASK-ID-1');
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
				TasksActions.loadTasksSuccess({
					tasks,
				})
			);
			const task = createTasksEntity('AAA');
			facade.addItem(task);
			const request = httpMock.expectOne(endpoints.TASKS_API);
			request.flush(task);
			const list = await readFirst(facade.allTasks$);
			expect(list.length).toBe(2);
			expect(list[1]).toBe(task);
		});

		it('updateItem() should update an item', async () => {
			store.dispatch(
				TasksActions.loadTasksSuccess({
					tasks,
				})
			);
			const oldTask = tasks[0];
			const task = { ...tasks[0], description: 'new description' };
			facade.updateItem(task);
			const request = httpMock.expectOne(endpoints.TASKS_API + '/' + task.id);
			request.flush({ ...oldTask, dataUpdate: task });
			const list = await readFirst(facade.allTasks$);
			expect(list.length).toBe(1);
			expect(list[0]).toBe(task);
		});

		it('deleteItem() should delete an item', async () => {
			store.dispatch(
				TasksActions.loadTasksSuccess({
					tasks,
				})
			);
			const task = tasks[0];
			facade.deleteItem(task.id);
			const request = httpMock.expectOne(endpoints.TASKS_API + '/' + task.id);
			request.flush(task.id);
			const list = await readFirst(facade.allTasks$);
			expect(list.length).toBe(0);
		});
	});
});
