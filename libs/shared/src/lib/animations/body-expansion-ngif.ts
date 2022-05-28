import { trigger, transition, style, animate } from '@angular/animations';

export function bodyExpansionNgIf(name: string) {
	return trigger(name, [
		transition(':enter', [style({ opacity: 0, height: '0px' }), animate(350, style({ opacity: 1, height: '*' }))]),
		transition(':leave', [animate(350, style({ opacity: 0, height: '0px' }))])
	]);
}
