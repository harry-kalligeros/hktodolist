import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as TodosActions from './todos.actions';
import * as TodosFeature from './todos.reducer';
import { TodosService } from '@hktodolist/core-data';
import { exhaustMap, map } from 'rxjs';
import { Todo } from '@hktodolist/api-interfaces';

@Injectable()
export class TodosEffects {
	init$ = createEffect(() =>
		this.actions$.pipe(
			ofType(TodosActions.init),
			fetch({
				run: (action) => {
					// Your custom service 'load' logic goes here. For now just return a success action...
					return this.todosService
						.all()
						.pipe(map((todos: Todo[]) => TodosActions.loadTodosSuccess({ todos })));
				},
				onError: (action, error) => {
					console.error('Error', error);
					return TodosActions.loadTodosFailure({ error });
				},
			})
		)
	);

	addTodo$ = createEffect(() =>
		this.actions$.pipe(
			ofType(TodosActions.addTodo),
			fetch({
				run: (action) => {
					return this.todosService
						.add(action.todo)
						.pipe(map((todo) => TodosActions.todoAddedSuccess({ todo })));
				},
				onError: (action, error) => {
					return TodosActions.todoAddedFailure({ error });
				},
			})
		)
	);

	updateTodo$ = createEffect(() =>
		this.actions$.pipe(
			ofType(TodosActions.setTodo),
			fetch({
				run: (action) => {
					return this.todosService
						.update(action.todo)
						.pipe(map((todo) => TodosActions.todoUpdatedSuccess({ todo })));
				},
				onError: (action, error) => {
					return TodosActions.todoUpdatedFailure({ error });
				},
			})
		)
	);

	deleteTodo$ = createEffect(() =>
		this.actions$.pipe(
			ofType(TodosActions.deleteTodo),
			fetch({
				run: (action) => {
					return this.todosService
						.delete(action.id)
						.pipe(map(({ id }) => TodosActions.todoDeletedSuccess({ id })));
				},
				onError: (action, error) => {
					return TodosActions.todoDeletedFailure({ error });
				},
			})
		)
	);

	constructor(private readonly actions$: Actions, private readonly todosService: TodosService) {}
}
