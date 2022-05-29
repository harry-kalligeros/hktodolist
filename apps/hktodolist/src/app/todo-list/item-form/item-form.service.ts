import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class ItemFormService {
	get itemForm(): FormGroup {
		return this._itemForm;
	}

	private _itemForm: FormGroup;

	constructor(private fb: FormBuilder) {}

	/**
	 * Makes a reactive form of a todo item
	 */
	public makeForm(type: 'task' | 'todo') {
		this._itemForm = this.fb.group({
			id: [''],
			name: ['', Validators.required],
			description: [''],
		});
		if (type === 'task') {
			this._itemForm.registerControl('todoId', this.fb.control('', Validators.required));
		}
	}

	public resetForm() {
		const value = {
			id: '',
			name: '',
			description: '',
		};
		this.itemForm?.reset(value);
	}
}
