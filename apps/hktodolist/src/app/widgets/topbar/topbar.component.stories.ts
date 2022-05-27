import { CommonModule } from '@angular/common';
import { TopbarComponent } from './topbar.component';

export default {
	title: 'Top bar',
	component: TopbarComponent,
};

export const primary = () => ({
	moduleMetadata: {
		imports: [CommonModule],
		declarations: [TopbarComponent],
	},
	props: {},
});
