import { TestBed } from '@angular/core/testing';

import { ToastService } from './toast.service';
import { OverlayModule } from '@angular/cdk/overlay';

describe('ToastService', () => {
	let service: ToastService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [OverlayModule],
		});
		service = TestBed.inject(ToastService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
