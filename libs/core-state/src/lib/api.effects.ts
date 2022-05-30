import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastService } from '@hktodolist/shared';
import * as TasksActions from './tasks/tasks.actions';
import * as TodosActions from './todos/todos.actions';
import { tap } from 'rxjs';
import { Action } from '@ngrx/store';
import { ToastType } from '@hktodolist/api-interfaces';

@Injectable()
export class ApiEffects {
	private errorsMap = new Map<string, string>();
	onFailure$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					TodosActions.todoAddedSuccess,
					TodosActions.todoUpdatedSuccess,
					TodosActions.todoDeletedSuccess,
					TasksActions.taskAddedSuccess,
					TasksActions.taskUpdatedSuccess,
					TasksActions.taskDeletedSuccess,

					TodosActions.loadTodosFailure,
					TodosActions.todoAddedFailure,
					TodosActions.todoUpdatedFailure,
					TodosActions.todoDeletedFailure,
					TasksActions.loadTasksFailure,
					TasksActions.taskAddedFailure,
					TasksActions.taskUpdatedFailure,
					TasksActions.taskDeletedFailure
				),
				tap((action: Action) => {
					const type = action.type?.includes('Failure') ? 'is-danger' : 'is-success';
					this.showToast(this.errorsMap.get(action.type), type);
				})
			),
		{ dispatch: false }
	);
	private showToast(message: string | undefined, type: ToastType) {
		this.toastService.show({
			text: message || `Something went wrong! Please try again`,
			type,
		});
	}
	constructor(private readonly actions$: Actions, private readonly toastService: ToastService) {
		this.errorsMap.set(TodosActions.todoAddedSuccess.type, 'Todo added successfully.');
		this.errorsMap.set(TodosActions.todoUpdatedSuccess.type, 'Todo updated successfully.');
		this.errorsMap.set(TodosActions.todoDeletedSuccess.type, 'Todo deleted successfully.');
		this.errorsMap.set(TasksActions.taskAddedSuccess.type, 'Task added successfully.');
		this.errorsMap.set(TasksActions.taskUpdatedSuccess.type, 'Task updated successfully.');
		this.errorsMap.set(TasksActions.taskDeletedSuccess.type, 'Task deleted successfully.');

		this.errorsMap.set(TodosActions.loadTodosFailure.type, 'Failed to fetch todos. Please try again!');
		this.errorsMap.set(TodosActions.todoAddedFailure.type, 'Failed to add todo. Please try again!');
		this.errorsMap.set(TodosActions.todoUpdatedFailure.type, 'Failed to update todo. Please try again!');
		this.errorsMap.set(TodosActions.todoDeletedFailure.type, 'Failed to delete todo. Please try again!');
		this.errorsMap.set(TasksActions.loadTasksFailure.type, 'Failed to fetch tasks. Please try again!');
		this.errorsMap.set(TasksActions.taskAddedFailure.type, 'Failed to add task. Please try again!');
		this.errorsMap.set(TasksActions.taskUpdatedFailure.type, 'Failed to update task. Please try again!');
		this.errorsMap.set(TasksActions.taskDeletedFailure.type, 'Failed to delete task. Please try again!');
	}
}
