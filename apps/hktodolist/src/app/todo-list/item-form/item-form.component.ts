import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnInit,
	Output,
	SimpleChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ItemFormService } from './item-form.service';
import { Todo, Task, UpsertPayload, ViewMode } from '@hktodolist/api-interfaces';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'hk-todo-form',
	templateUrl: './item-form.component.html',
	styleUrls: ['./item-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ItemFormService],
})
export class ItemFormComponent implements OnInit, OnChanges {
	itemFormGroup: FormGroup;
	actionType: 'Add' | 'Save' = 'Add';
	faTimesCircle = faTimesCircle;
	isSubmitted = false;

	@Input() itemType: 'todo' | 'task' = 'todo';
	@Input() selectedItem: Todo | Task | null | undefined;
	@Input() selectedTodoId: string | null | undefined;
	@Input() viewMode: ViewMode | null | unknown;
	@Output() cancel = new EventEmitter<void>();
	@Output() upsert = new EventEmitter<UpsertPayload>();

	constructor(private itemFormService: ItemFormService) {}

	ngOnInit() {
		this.itemFormService.makeForm(this.itemType);
		this.itemFormGroup = this.itemFormService.itemForm;
	}

	ngOnChanges(changes: SimpleChanges) {
		let currentItem = changes['selectedItem']?.currentValue;
		if (this.itemType === 'task' && this.selectedTodoId) {
			currentItem = { ...currentItem, todoId: this.selectedTodoId };
		}
		if (currentItem) {
			this.itemFormGroup.patchValue(currentItem);
		} else {
			this.resetForm();
		}

		const currentViewMode = changes['viewMode']?.currentValue || this.viewMode;
		this.actionType = currentViewMode === 'edit' ? 'Save' : 'Add';
	}

	upsertHandler() {
		this.isSubmitted = true;

		if (this.itemFormGroup.invalid) {
			return;
		}

		const payload: UpsertPayload = {
			viewMode: this.viewMode as ViewMode,
			item: this.itemFormGroup.value,
		};
		this.upsert.emit(payload);
		if (this.viewMode === 'add') {
			this.resetForm();
		}
		this.isSubmitted = false;
	}

	/**
	 * Resets the current form
	 * @private
	 */
	private resetForm() {
		this.itemFormService.resetForm(this.itemType, this.selectedTodoId);
	}
}
