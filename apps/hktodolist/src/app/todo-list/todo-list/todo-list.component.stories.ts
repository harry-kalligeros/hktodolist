import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list.component';
import { IconsModule } from '../../icons/icons.module';

export default {
	title: 'Todo List',
	component: TodoListComponent,
};

export const primary = () => ({
	moduleMetadata: {
		imports: [CommonModule, IconsModule],
		declarations: [TodoListComponent],
	},
	props: {
		todos: [
			{
				id: '3f70d660-892b-11ea-ad7e-57f4ce0f7e32',
				name: 'Dentist',
				description: 'Tomorrow appointment to my dentist',
			},
			{
				id: 'f6bbec5c-b211-4eda-924d-e0b3920c80b6',
				name: 'Gym',
				description: 'Fitness for tonight',
			},
		],
	},
});
