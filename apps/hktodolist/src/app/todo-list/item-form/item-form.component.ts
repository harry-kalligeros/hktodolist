import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ItemFormService } from './item-form.service';
import { Todo, ViewMode } from '@hktodolist/api-interfaces';

@Component({
	selector: 'hk-todo-form',
	templateUrl: './item-form.component.html',
	styleUrls: ['./item-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ItemFormService],
})
export class ItemFormComponent implements OnInit, OnChanges {
	todoFormGroup: FormGroup;
	actionType: 'Add' | 'Save' = 'Add';

	@Input() itemType: 'todo' | 'task' = 'todo';
	@Input() selectedItem: Todo | Task | null | undefined;
	@Input() viewMode: ViewMode | null | unknown;

	constructor(private todoFormService: ItemFormService) {}

	ngOnInit() {
		this.todoFormService.makeForm(this.itemType);
		this.todoFormGroup = this.todoFormService.itemForm;
	}

	ngOnChanges(changes: SimpleChanges) {
		const currentItem = changes['selectedItem']?.currentValue;
		if (currentItem) {
			this.todoFormGroup.setValue(currentItem);
		}

		const currentViewMode = changes['viewMode']?.currentValue || this.viewMode;
		this.actionType = currentViewMode === 'edit' ? 'Save' : 'Add';
	}
}
