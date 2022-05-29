import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable, of, tap } from 'rxjs';

import * as TasksActions from './tasks.actions';
import { TasksEffects } from './tasks.effects';
import { Task } from '@hktodolist/api-interfaces';
import { endpoints, TasksService, TodosService } from '@hktodolist/core-data';
import { tasks } from '@hktodolist/fixtures';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

class MockTasksService {
	all(): Observable<Task[]> {
		return of(tasks);
	}
}

describe('TasksEffects', () => {
	let actions: Observable<Action>;
	let effects: TasksEffects;
	let httpMock: HttpTestingController;
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
	});

	describe('init$', () => {
		it('should work', () => {
			actions = hot('-a-|', { a: TasksActions.init() });

			const expected = hot('-a-|', { a: TasksActions.loadTasksSuccess({ tasks }) });

			expect(effects.init$).toBeObservable(expected);
		});
	});
});
