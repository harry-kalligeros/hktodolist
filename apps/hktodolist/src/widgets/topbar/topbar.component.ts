import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
	selector: 'hktodolist-topbar',
	templateUrl: './topbar.component.html',
	styleUrls: ['./topbar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
