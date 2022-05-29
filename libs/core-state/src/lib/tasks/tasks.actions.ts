import { createAction, props } from '@ngrx/store';
import { TasksEntity } from './tasks.models';
import { ViewMode } from '@hktodolist/api-interfaces';

export const init = createAction('[Tasks Page] Init');

export const loadTasksSuccess = createAction('[Tasks/API] Load Tasks Success', props<{ tasks: TasksEntity[] }>());

export const loadTasksFailure = createAction('[Tasks/API] Load Tasks Failure', props<{ error: any }>());

export const selectTask = createAction('[Tasks Page] Select task', props<{ id: string }>());

export const toggleViewMode = createAction('[Tasks Page] Toggle viewMode', props<{ viewMode: ViewMode }>());
