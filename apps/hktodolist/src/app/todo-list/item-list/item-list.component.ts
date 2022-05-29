import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
	TrackByFunction,
} from '@angular/core';
import { DeletePayload, FullTodo, Task, ViewMode } from '@hktodolist/api-interfaces';
import { faChevronDown, faChevronRight, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { bodyExpansionNgIf } from '@hktodolist/shared';

type IterableItem = FullTodo | Task;
@Component({
	selector: 'hk-item-list',
	templateUrl: './item-list.component.html',
	styleUrls: ['./item-list.component.scss'],
	animations: [bodyExpansionNgIf('bodyExpansion')],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemListComponent {
	faPencil = faPencil;
	faTrash = faTrash;
	faChevronRight = faChevronRight;
	faChevronDown = faChevronDown;

	pluralMapping: Record<string, string> = {
		todo: 'todos',
		task: 'tasks',
	};
	expandedState: Record<string, boolean> = {};

	@Input() items$: Observable<IterableItem[]>;
	@Input() type: 'todo' | 'task' = 'todo';
	@Input() selectedId: string | null | undefined = '';
	@Output() itemSelected = new EventEmitter<string>();
	@Output() toggleMode = new EventEmitter<ViewMode>();
	@Output() itemDeleted = new EventEmitter<DeletePayload>();

	trackByTodo: TrackByFunction<FullTodo> = (index: number, item: FullTodo) => {
		return item.id;
	};

	clickTodoHandler($event: Event) {
		const id = ($event.target as HTMLInputElement).value;
		this.itemSelected.emit(id);
	}

	toggleItem(id: string) {
		this.expandedState[id] = !this.expandedState[id];
	}

	editItem(id: string) {
		this.itemSelected.emit(id);
		this.toggleMode.emit('edit');
	}

	deleteItem(id: string) {
		const payload: DeletePayload = {
			type: this.type,
			id,
		};
		this.itemDeleted.emit(payload);
	}
}
