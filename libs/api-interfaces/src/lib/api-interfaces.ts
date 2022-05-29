export type CollectionName = 'todos' | 'tasks';
export type Data = {
	todos: Todo[];
	tasks: Task[];
};

export interface Todo {
	id: string;
	name: string;
	description?: string;
}

export interface Task extends Todo {
	todoId: string;
}

export interface FullTodo extends Todo {
	tasks: Task[];
}

export type ViewMode = 'view' | 'edit' | 'add';

export interface UpsertPayload {
	viewMode: ViewMode;
	item: Todo | Task;
}

export interface DeletePayload {
	type: 'todo' | 'task';
	id: string;
}

export interface Facade<T> {
	addItem: (item: T) => void;
	updateItem: (item: T) => void;
	deleteItem: (id: string) => void;
}

interface DataUpdate<T> {
	dataUpdate: T;
}

export type Patched<T> = T & DataUpdate<T>;

export interface ToastData {
	text: string;
	type: ToastType;
}

export type ToastType = 'is-danger' | 'is-info' | 'is-success';
