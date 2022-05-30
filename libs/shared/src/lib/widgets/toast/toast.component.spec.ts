import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastComponent } from './toast.component';
import { TOAST_DATA, TOAST_REF } from './toast.tokens';
import { ToastData } from '@hktodolist/api-interfaces';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

const data: ToastData = {
	type: 'is-success',
	text: 'Data updated successfully',
};

describe('ToastComponent', () => {
	let component: ToastComponent;
	let fixture: ComponentFixture<ToastComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [NoopAnimationsModule],
			declarations: [ToastComponent],
			providers: [
				{ provide: TOAST_DATA, useValue: data },
				{ provide: TOAST_REF, useValue: { close: () => {} } },
			],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ToastComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
