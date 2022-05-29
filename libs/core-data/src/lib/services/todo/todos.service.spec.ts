import { TestBed } from '@angular/core/testing';

import { TodosService } from './todos.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TodoService', () => {
	let service: TodosService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
		});
		service = TestBed.inject(TodosService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
