import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoFormComponent } from './todo-form.component';

export default {
	title: 'Todo Form',
	component: TodoFormComponent,
};

export const primary = () => ({
	moduleMetadata: {
		imports: [CommonModule, ReactiveFormsModule],
		declarations: [TodoFormComponent],
	},
	props: {},
});
