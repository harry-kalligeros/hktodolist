import { Pipe, PipeTransform } from '@angular/core';
import { ViewMode } from '@hktodolist/api-interfaces';

@Pipe({
	name: 'showAdd',
})
export class ShowAddPipe implements PipeTransform {
	transform(type: 'todo' | 'task', viewMode: ViewMode | unknown, selectedTodoId: string | undefined | null): boolean {
		return (
			(viewMode === 'view' || viewMode === 'edit') && (type === 'todo' || (type === 'task' && !!selectedTodoId))
		);
	}
}
