import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListComponent } from './item-list.component';

describe('TodoListComponent', () => {
	let component: ItemListComponent;
	let fixture: ComponentFixture<ItemListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ItemListComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ItemListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});