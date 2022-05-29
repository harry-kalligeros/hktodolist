import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';

import * as TodosActions from './todos.actions';
import { TodosEffects } from './todos.effects';
import { TodosService } from '@hktodolist/core-data';
import { Todo } from '@hktodolist/api-interfaces';
import { todos } from '@hktodolist/fixtures';

class MockTodosService {
	all(): Observable<Todo[]> {
		return of(todos);
	}
}

describe('TodosEffects', () => {
	let actions: Observable<Action>;
	let effects: TodosEffects;
	let httpService: TodosService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [NxModule.forRoot()],
			providers: [
				TodosEffects,
				{ provide: TodosService, useClass: MockTodosService },
				provideMockActions(() => actions),
				provideMockStore(),
			],
		});

		effects = TestBed.inject(TodosEffects);
		httpService = TestBed.inject(TodosService);
	});

	describe('init$', () => {
		it('should work', () => {
			actions = hot('-a-|', { a: TodosActions.init() });

			const expected = hot('-a-|', { a: TodosActions.loadTodosSuccess({ todos }) });
			expect(effects.init$).toBeObservable(expected);
		});

		it(`should call the TodosService's all method`, () => {
			const spy = jest.spyOn(httpService, 'all');
			effects.init$.subscribe((res) => {
				expect(spy).toHaveBeenCalledTimes(1);
			});
		});
	});
});
