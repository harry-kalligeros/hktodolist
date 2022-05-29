import { Injectable } from '@angular/core';
import { endpoints } from '../../endpoints';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Patched, Task } from '@hktodolist/api-interfaces';

@Injectable({
	providedIn: 'root',
})
export class TasksService {
	private API = endpoints.TASKS_API;
	constructor(private http: HttpClient) {}

	/**
	 * Fetches all tasks
	 */
	all(): Observable<Task[]> {
		return this.http.get<Task[]>(this.getUrl());
	}

	/**
	 * Adds a task
	 */
	add(task: Task) {
		return this.http.post<Task>(this.getUrl(), task);
	}

	/**
	 * Updates a task
	 * @param task
	 */
	update(task: Task) {
		return this.http.patch<Patched<Task>>(this.getUrl(task.id), task).pipe(map((res) => res.dataUpdate));
	}

	/**
	 * Deletes a task
	 * @param id
	 */
	delete(id: string) {
		return this.http.delete(this.getUrl(id), { responseType: 'text' }).pipe(map((res: string) => ({ id: res })));
	}

	private getUrl(id?: string) {
		let url = this.API;
		if (id) {
			url += `/${id}`;
		}
		return url;
	}
}
