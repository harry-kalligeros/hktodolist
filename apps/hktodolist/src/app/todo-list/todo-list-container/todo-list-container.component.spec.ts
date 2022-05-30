import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListContainerComponent } from './todo-list-container.component';
import { TasksFacade, TodosFacade } from '@hktodolist/core-state';
import { NO_ERRORS_SCHEMA } from '@angular/core';

class MockFacade {
	init() {}
}

describe('TodoListContainerComponent', () => {
	let component: TodoListContainerComponent;
	let fixture: ComponentFixture<TodoListContainerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TodoListContainerComponent],
			providers: [
				{ provide: TodosFacade, useClass: MockFacade },
				{ provide: TasksFacade, useClass: MockFacade },
			],
			schemas: [NO_ERRORS_SCHEMA],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TodoListContainerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
