import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class TodoFormService {
	get todoForm(): FormGroup {
		return this._todoForm;
	}

	private _todoForm: FormGroup = new FormGroup({});

	constructor(private fb: FormBuilder) {
		this.makeForm();
	}

	/**
	 * Makes a reactive form of a todo item
	 */
	public makeForm() {
		this._todoForm = this.fb.group({
			id: [''],
			name: ['', Validators.required],
			description: [''],
		});
	}

	public resetForm() {
		const value = {
			id: '',
			name: '',
			description: '',
		};
		this.todoForm?.reset(value);
	}
}
