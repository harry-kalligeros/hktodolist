import * as fromTodos from './todos/todos.reducer';
import * as fromTasks from './tasks/tasks.reducer';
import { ActionReducerMap } from '@ngrx/store';

export type AppState = fromTodos.TodosPartialState & fromTasks.TasksPartialState;

export const reducers: ActionReducerMap<AppState> = {
	[fromTodos.TODOS_FEATURE_KEY]: fromTodos.reducer,
	[fromTasks.TASKS_FEATURE_KEY]: fromTasks.reducer,
};
