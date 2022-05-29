import { Component, Inject, OnInit } from '@angular/core';
import { ToastData, ToastType } from '@hktodolist/api-interfaces';
import { TOAST_DATA, TOAST_REF } from './toast.tokens';
import { ToastRef } from './toast-ref';
import { toastAnimations, ToastAnimationState } from './toast-animations';
import { defaultToastConfig, ToastConfig } from './toast-config';
import { AnimationEvent } from '@angular/animations';

// implementation borrowed from
// https://adrianfaciu.dev/posts/angular-toast-service/

@Component({
	selector: 'hk-toast',
	template: `<div
		class="notification {{ toastType }}"
		[@fadeAnimation]="{
			value: animationState,
			params: { fadeIn: toastConfig.animation?.fadeIn, fadeOut: toastConfig.animation?.fadeOut }
		}"
		(@fadeAnimation.done)="onFadeFinished($event)"
	>
		<button class="delete" (click)="close()" aria-label="close"></button>
		<div>{{ data.text }}</div>
	</div>`,
	styles: [],
	animations: [toastAnimations.fadeToast],
})
export class ToastComponent implements OnInit {
	toastType: ToastType;
	animationState: ToastAnimationState = 'default';
	toastConfig: ToastConfig = defaultToastConfig;

	private intervalId: any;

	constructor(@Inject(TOAST_DATA) public readonly data: ToastData, @Inject(TOAST_REF) public readonly ref: ToastRef) {
		this.toastType = data.type;
	}

	ngOnInit() {
		this.intervalId = setTimeout(() => (this.animationState = 'closing'), 5000);
	}

	ngOnDestroy() {
		clearTimeout(this.intervalId);
	}

	close() {
		this.ref.close();
	}

	onFadeFinished(event: AnimationEvent) {
		const { toState } = event;
		const isFadeOut = (toState as ToastAnimationState) === 'closing';
		const itFinished = this.animationState === 'closing';

		if (isFadeOut && itFinished) {
			this.close();
		}
	}
}
