import { createAction, props } from '@ngrx/store';
import { TasksEntity } from './tasks.models';
import { Task, ViewMode } from '@hktodolist/api-interfaces';

export const init = createAction('[Tasks Page] Init');

export const loadTasksSuccess = createAction('[Tasks/API] Load Tasks Success', props<{ tasks: TasksEntity[] }>());

export const loadTasksFailure = createAction('[Tasks/API] Load Tasks Failure', props<{ error: any }>());

export const selectTask = createAction('[Tasks Page] Select task', props<{ id: string }>());

export const toggleViewMode = createAction('[Tasks Page] Toggle viewMode', props<{ viewMode: ViewMode }>());

export const addTask = createAction('[Tasks/API] Add Task', props<{ task: Task }>());
export const taskAddedSuccess = createAction('[Tasks/API] Task added successfully', props<{ task: Task }>());
export const taskAddedFailure = createAction('[Tasks/API] Task not added', props<{ error: any }>());
export const setTask = createAction('[Tasks/API] Set Task', props<{ task: Task }>());
export const taskUpdatedSuccess = createAction('[Tasks/API] Task updated successfully', props<{ task: Task }>());
export const taskUpdatedFailure = createAction('[Tasks/API] Task not updated', props<{ error: any }>());
export const deleteTask = createAction('[Tasks/API] Delete Task', props<{ id: string }>());
export const taskDeletedSuccess = createAction('[Tasks/API] Task deleted successfully', props<{ id: string }>());
export const taskDeletedFailure = createAction('[Tasks/API] Task not deleted', props<{ error: any }>());
