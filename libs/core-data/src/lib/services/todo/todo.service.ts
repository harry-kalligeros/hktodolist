import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { endpoints } from '../../endpoints';
import { FullTodo } from '@hktodolist/api-interfaces';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class TodoService {
	private API = endpoints.TODO_API;
	constructor(private http: HttpClient) {}

	/**
	 * Fetches all todos
	 */
	all(): Observable<FullTodo[]> {
		return this.http.get<FullTodo[]>(this.getUrl());
	}

	private getUrl() {
		return this.API;
	}
}
