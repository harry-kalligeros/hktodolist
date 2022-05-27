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
