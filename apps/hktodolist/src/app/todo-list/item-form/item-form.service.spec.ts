import { TestBed } from '@angular/core/testing';

import { ItemFormService } from './item-form.service';
import { FormBuilder } from '@angular/forms';
class MockBuilder {}
describe('TodoFormService', () => {
	let service: ItemFormService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ItemFormService, { provide: FormBuilder, useClass: MockBuilder }],
		});
		service = TestBed.inject(ItemFormService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
