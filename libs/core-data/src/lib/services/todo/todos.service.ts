import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { endpoints } from '../../endpoints';
import { Todo } from '@hktodolist/api-interfaces';
import { Observable } from 'rxjs';

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

	private getUrl() {
		return this.API;
	}
}
