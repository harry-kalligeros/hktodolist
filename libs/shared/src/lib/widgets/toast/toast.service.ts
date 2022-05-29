import { Injectable, Injector } from '@angular/core';
import { ToastData } from '@hktodolist/api-interfaces';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { ToastComponent } from './toast.component';
import { ToastRef } from './toast-ref';
import { TOAST_DATA, TOAST_REF } from './toast.tokens';

@Injectable({
	providedIn: 'root',
})
export class ToastService {
	private lastToast: Overlay;
	constructor(private overlay: Overlay, private parentInjector: Injector) {}

	show(data: ToastData) {
		const positionStrategy = this.overlay.position().global().right();

		const overlayRef = this.overlay.create({ positionStrategy });

		const toastRef = new ToastRef(overlayRef);
		const injector = this.getInjector(data, toastRef, this.parentInjector);
		const toastPortal = new ComponentPortal(ToastComponent, null, injector);

		overlayRef.attach(toastPortal);

		return toastRef;
	}

	getInjector(data: ToastData, toastRef: ToastRef, parentInjector: Injector) {
		return Injector.create({
			providers: [
				{ provide: TOAST_DATA, useValue: data },
				{ provide: TOAST_REF, useValue: toastRef },
			],
			parent: parentInjector,
			name: 'ToastInjector',
		});
	}
}
