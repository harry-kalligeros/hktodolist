import { OverlayRef } from '@angular/cdk/overlay';

export class ToastRef {
	constructor(public readonly overlay: OverlayRef) {}

	close() {
		this.overlay.dispose();
	}

	getPosition() {
		return this.overlay.overlayElement.getBoundingClientRect();
	}
}
