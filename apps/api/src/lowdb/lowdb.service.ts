import { Injectable } from '@nestjs/common';
import { JSONFile, Low } from 'lowdb-cjs';

import * as uuid from 'uuid';
import { Task, Todo, Data, CollectionName } from '@hktodolist/api-interfaces';

type TodoDbItem = Task | Todo;

@Injectable()
export class LowdbService {
	private db: Low<Data>;

	constructor() {
		this.initDatabase('todos');
	}

	/**
	 * Initializes the database
	 * @param collectionName
	 * @private
	 */
	private async initDatabase(collectionName: CollectionName) {
		// Use JSON file for storage
		const file = 'db.json';
		const adapter = new JSONFile<Data>(file);
		this.db = new Low<Data>(adapter);
		await this.db.read();
		if (!this.db.data) {
			this.db.data = { todos: [], tasks: [] };
			await this.db.write();
		}
	}

	/**
	 * Returns all database records in a slice
	 * @param collectionName
	 */
	async findAll<T extends TodoDbItem>(collectionName: CollectionName): Promise<T[]> {
		const items = await this.getItems<T>(collectionName);
		return items;
	}

	/**
	 * Finds some database records in a slice
	 * @param condition
	 * @param collectionName
	 */
	async find<T extends TodoDbItem>(
		condition: (item: TodoDbItem) => boolean,
		collectionName: CollectionName
	): Promise<T[]> {
		const items = await this.getItems<T>(collectionName);
		const values = items.filter(condition);
		return values;
	}

	/**
	 * Finds a database record
	 * @param condition
	 * @param collectionName
	 */
	async findOne<T extends TodoDbItem>(
		condition: (item: TodoDbItem) => boolean,
		collectionName: CollectionName
	): Promise<T> {
		const items = await this.getItems<T>(collectionName);
		const value = items.find(condition);
		return value;
	}

	/**
	 * Updates a record in a database slice
	 * @param key
	 * @param value
	 * @param collectionName
	 * @param dataUpdate
	 */
	async update<T extends TodoDbItem>(
		key: string,
		value: string,
		collectionName: CollectionName,
		dataUpdate: any
	): Promise<T> {
		const items = await this.getItems<T>(collectionName);
		let out;
		const listData = items.map((item) => {
			if (item[key] !== value) return item;
			if (item[key] === value) {
				out = { ...item, dataUpdate };
				return out;
			}
		});
		this.db.data[collectionName] = listData;
		await this.db.write();
		return out;
	}

	/**
	 * Adds a record to a database slice
	 * @param record
	 * @param collectionName
	 */
	async add<T extends TodoDbItem>(record: any, collectionName: CollectionName): Promise<T> {
		const items = await this.getItems<T>(collectionName);
		const item = { id: uuid.v4() as string, ...record };
		items.push(item);
		await this.db.write();
		return item;
	}

	async remove<T extends TodoDbItem>(id: string, collectionName: CollectionName): Promise<string> {
		const items = await this.getItems<T>(collectionName);
		const index = items.findIndex((item) => item.id === id);
		items.splice(index, 1);
		await this.db.write();
		return id;
	}

	/**
	 * Return a database slice
	 * @param collectionName
	 * @private
	 */
	private async getItems<T extends TodoDbItem>(collectionName: CollectionName): Promise<T[]> {
		await this.db.read();
		const items: T[] = (await this.db.data[collectionName]) as TodoDbItem[] as T[];
		return items;
	}
}
