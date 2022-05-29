import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as TasksActions from './tasks.actions';
import { TasksService } from '@hktodolist/core-data';
import { map } from 'rxjs';
import { Task } from '@hktodolist/api-interfaces';

@Injectable()
export class TasksEffects {
	init$ = createEffect(() =>
		this.actions$.pipe(
			ofType(TasksActions.init),
			fetch({
				run: (action) => {
					// Your custom service 'load' logic goes here. For now just return a success action...
					return this.tasksService
						.all()
						.pipe(map((tasks: Task[]) => TasksActions.loadTasksSuccess({ tasks })));
				},
				onError: (action, error) => {
					console.error('Error', error);
					return TasksActions.loadTasksFailure({ error });
				},
			})
		)
	);

	addTask$ = createEffect(() =>
		this.actions$.pipe(
			ofType(TasksActions.addTask),
			fetch({
				run: (action) => {
					return this.tasksService
						.add(action.task)
						.pipe(map((task) => TasksActions.taskAddedSuccess({ task })));
				},
				onError: (action, error) => {
					return TasksActions.taskAddedFailure({ error });
				},
			})
		)
	);

	updateTask$ = createEffect(() =>
		this.actions$.pipe(
			ofType(TasksActions.setTask),
			fetch({
				run: (action) => {
					return this.tasksService
						.update(action.task)
						.pipe(map((task) => TasksActions.taskUpdatedSuccess({ task })));
				},
				onError: (action, error) => {
					return TasksActions.taskUpdatedFailure({ error });
				},
			})
		)
	);

	deleteTask$ = createEffect(() =>
		this.actions$.pipe(
			ofType(TasksActions.deleteTask),
			fetch({
				run: (action) => {
					return this.tasksService
						.delete(action.id)
						.pipe(map(({ id }) => TasksActions.taskDeletedSuccess({ id })));
				},
				onError: (action, error) => {
					return TasksActions.taskDeletedFailure({ error });
				},
			})
		)
	);

	constructor(private readonly actions$: Actions, private readonly tasksService: TasksService) {}
}
