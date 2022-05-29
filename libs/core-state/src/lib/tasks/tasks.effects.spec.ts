import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';

import * as TasksActions from './tasks.actions';
import { TasksEffects } from './tasks.effects';
import { Task } from '@hktodolist/api-interfaces';
import { TasksService } from '@hktodolist/core-data';
import { tasks } from '@hktodolist/fixtures';

class MockTasksService {
	all(): Observable<Task[]> {
		return of(tasks);
	}
	add(task: Task) {
		return of(task);
	}

	update(task: Task) {
		return of(task);
	}

	delete(id: string): Observable<{ id: string }> {
		return of({ id });
	}
}

describe('TasksEffects', () => {
	let actions: Observable<Action>;
	let effects: TasksEffects;
	let httpService: TasksService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [NxModule.forRoot()],
			providers: [
				TasksEffects,
				{ provide: TasksService, useClass: MockTasksService },
				provideMockActions(() => actions),
				provideMockStore(),
			],
		});

		effects = TestBed.inject(TasksEffects);
		httpService = TestBed.inject(TasksService);
	});

	describe('init$', () => {
		it('should work', () => {
			actions = hot('-a-|', { a: TasksActions.init() });

			const expected = hot('-a-|', { a: TasksActions.loadTasksSuccess({ tasks }) });

			expect(effects.init$).toBeObservable(expected);
		});
	});

	describe('addTask$', () => {
		it('should work', () => {
			actions = hot('-a-|', { a: TasksActions.addTask({ task: tasks[0] }) });

			const expected = hot('-a-|', { a: TasksActions.taskAddedSuccess({ task: tasks[0] }) });
			expect(effects.addTask$).toBeObservable(expected);
		});
		it(`should call the TasksService's add method`, () => {
			const spy = jest.spyOn(httpService, 'add');
			effects.addTask$.subscribe((res) => {
				expect(spy).toHaveBeenCalledTimes(1);
			});
		});
	});

	describe('updateTask$', () => {
		it('should work', () => {
			actions = hot('-a-|', { a: TasksActions.setTask({ task: tasks[0] }) });

			const expected = hot('-a-|', { a: TasksActions.taskUpdatedSuccess({ task: tasks[0] }) });
			expect(effects.updateTask$).toBeObservable(expected);
		});
		it(`should call the TasksService's update method`, () => {
			const spy = jest.spyOn(httpService, 'update');
			effects.updateTask$.subscribe((res) => {
				expect(spy).toHaveBeenCalledTimes(1);
			});
		});
	});

	describe('deleteTask$', () => {
		it('should work', () => {
			actions = hot('-a-|', { a: TasksActions.deleteTask({ id: tasks[0].id }) });

			const expected = hot('-a-|', { a: TasksActions.taskDeletedSuccess({ id: tasks[0].id }) });
			expect(effects.deleteTask$).toBeObservable(expected);
		});
		it(`should call the TasksService's delete method`, () => {
			const spy = jest.spyOn(httpService, 'delete');
			effects.deleteTask$.subscribe((res) => {
				expect(spy).toHaveBeenCalledTimes(1);
			});
		});
	});
});
