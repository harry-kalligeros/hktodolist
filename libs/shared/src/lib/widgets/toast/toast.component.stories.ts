import { CommonModule } from '@angular/common';
import { IconsModule } from '../../../../../../apps/hktodolist/src/app/icons/icons.module';
import { ToastComponent } from './toast.component';
import { TOAST_DATA, TOAST_REF } from './toast.tokens';
import { ToastData } from '@hktodolist/api-interfaces';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
	title: 'Toast component',
	component: ToastComponent,
};

const data: ToastData = {
	type: 'is-success',
	text: 'Data updated successfully',
};

export const primary = () => ({
	moduleMetadata: {
		imports: [BrowserAnimationsModule, CommonModule, IconsModule],
		declarations: [ToastComponent],
		providers: [
			{ provide: TOAST_DATA, useValue: data },
			{ provide: TOAST_REF, useValue: { close: () => {} } },
		],
	},
	props: {},
});
