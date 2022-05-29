import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { ItemFormComponent } from './item-form.component';
import { ItemFormService } from './item-form.service';
class MockService {
	makeForm(type: string) {}
	group(...args: unknown[]) {}
}
describe('TodoFormComponent', () => {
	let component: ItemFormComponent;
	let fixture: ComponentFixture<ItemFormComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ItemFormComponent],
			providers: [
				{ provide: ItemFormService, useClass: MockService },
				{ provide: FormBuilder, useClass: MockService },
			],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ItemFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
