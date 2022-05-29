import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { endpoints } from '../../endpoints';
import { Patched, Todo } from '@hktodolist/api-interfaces';
import { map, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class TodosService {
	private API = endpoints.TODOS_API;

	constructor(private http: HttpClient) {}

	/**
	 * Fetches all todos
	 */
	all(): Observable<Todo[]> {
		return this.http.get<Todo[]>(this.getUrl());
	}

	/**
	 * Adds a todo
	 */
	add(todo: Todo) {
		return this.http.post<Todo>(this.getUrl(), todo);
	}

	/**
	 * Updates a todo
	 * @param todo
	 */
	update(todo: Todo) {
		return this.http.patch<Patched<Todo>>(this.getUrl(todo.id), todo).pipe(map((res) => res.dataUpdate));
	}

	/**
	 * Deletes a todo
	 * @param id
	 */
	delete(id: string): Observable<{ id: string }> {
		return this.http.delete(this.getUrl(id), { responseType: 'text' }).pipe(map((res) => ({ id: res })));
	}

	private getUrl(id?: string) {
		let url = this.API;
		if (id) {
			url += `/${id}`;
		}
		return url;
	}
}
