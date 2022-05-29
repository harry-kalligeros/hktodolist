import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemFormComponent } from './item-form.component';

export default {
	title: 'Todo Form',
	component: ItemFormComponent,
};

export const primary = () => ({
	moduleMetadata: {
		imports: [CommonModule, ReactiveFormsModule],
		declarations: [ItemFormComponent],
	},
	props: {},
});
