import { TestBed } from '@angular/core/testing';

import { ItemFormService } from './item-form.service';

describe('TodoFormService', () => {
	let service: ItemFormService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(ItemFormService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
