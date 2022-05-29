import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './topbar/topbar.component';
import { ToastComponent } from './toast/toast.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

@NgModule({
	declarations: [TopbarComponent, ToastComponent],
	imports: [CommonModule, OverlayModule, PortalModule],
	exports: [TopbarComponent, ToastComponent],
})
export class WidgetsModule {}
