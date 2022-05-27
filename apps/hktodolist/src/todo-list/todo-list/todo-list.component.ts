import { ChangeDetectionStrategy, Component, Input, OnInit, TrackByFunction } from '@angular/core';
import { FullTodo } from '@hktodolist/api-interfaces';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'hk-todo-list',
	templateUrl: './todo-list.component.html',
	styleUrls: ['./todo-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent implements OnInit {
	faPencil = faPencil;
	faTrash = faTrash;
	@Input() todos: FullTodo[] = [];
	constructor() {}
	ngOnInit(): void {}

	trackByTodo: TrackByFunction<FullTodo> = (index: number, item: FullTodo) => {
		return item.id;
	};
}
