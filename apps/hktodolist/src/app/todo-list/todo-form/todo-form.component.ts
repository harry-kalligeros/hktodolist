import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TodoFormService } from './todo-form.service';

@Component({
	selector: 'hk-todo-form',
	templateUrl: './todo-form.component.html',
	styleUrls: ['./todo-form.component.scss'],
	providers: [TodoFormService],
})
export class TodoFormComponent implements OnInit {
	todoFormGroup: FormGroup;
	itemType: 'todo' | 'task' = 'todo';
	actionType: 'Add' | 'Update' = 'Add';
	constructor(private todoFormService: TodoFormService) {
		this.todoFormGroup = this.todoFormService.todoForm;
	}

	ngOnInit(): void {}
}
