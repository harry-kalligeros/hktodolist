import { Injectable } from '@angular/core';
import { endpoints } from '../../endpoints';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '@hktodolist/api-interfaces';

@Injectable({
	providedIn: 'root',
})
export class TasksService {
	private API = endpoints.TASKS_API;
	constructor(private http: HttpClient) {}

	/**
	 * Fetches all todos
	 */
	all(): Observable<Task[]> {
		return this.http.get<Task[]>(this.getUrl());
	}

	private getUrl() {
		return this.API;
	}
}
