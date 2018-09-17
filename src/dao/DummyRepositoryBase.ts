import {IRepository} from './IRepository';
import {IWebStorage} from './IWebStorage';
import {ISerializable} from '../model/ISerializable';

/*
The responsibility of this repository is act as a
data access layer, since we have no DB
 */

export abstract class DummyRepositoryBase<O extends { id: string }, T extends ISerializable<O>>
	implements IRepository<T> {
	private storage: IWebStorage;
	protected abstract type: string;

	constructor(storage: IWebStorage) {
		this.storage = storage;
	}

	private parseKey(id: string): string {
		return `${this.type}_${id}`;
	}

	// saving items
	private put(item: T) {
		this.storage.setItem(this.parseKey(item.id), JSON.stringify(item.serialize()));
	}

	// get a single item right from store (sync)
	private getFromStore(id: string): T {
		const result = this.storage.getItem(this.parseKey(id));
		if (!result) {
			throw new Error('Entry not found');
		}

		return this.getInstance(JSON.parse(result));
	}

	private getAllOptions(): O[] {
		const options: O[] = [];
		for (let i = 0; i < this.storage.length; i++) {
			const key = this.storage.key(i);
			if (key.indexOf(`${this.type}_`) !== -1) {
				const value = this.storage.getItem(key);
				options.push(JSON.parse(value));
			}
		}
		return options;
	}

	// function to instantiate serialized items
	protected abstract getInstance(options: O): T;

	// function used in the find method to decide which items to return
	protected abstract checkCriteria(criteria: string, item: T): boolean;

	// does search online
	protected abstract remoteSearch(criteria: string): Promise<O[]>;

	protected update(id: string, options: O): void {
		const item = this.getFromStore(id);
		const updatedOptions = {...item.serialize() as object, ...options as object};
		this.put(this.getInstance(updatedOptions as O));
	}

	// return all from store
	async getAll(): Promise<T[]> {
		const entries: T[] = [];
		for (let i = 0; i < this.storage.length; i++) {
			const key = this.storage.key(i);
			if (key.indexOf(`${this.type}_`) !== -1) {
				const value = this.storage.getItem(key);
				entries.push(this.getInstance(JSON.parse(value)));
			}
		}
		return entries;
	}

	// searching from items
	// doing online search + return from store
	async find(criteria: string): Promise<T[]> {
		const localOptions = this.getAllOptions();
		const fetchedOptions = await this.remoteSearch(criteria);
		const mergedOptions = [...localOptions];

		fetchedOptions.forEach((option) => {
			const alreadySaved = !!localOptions.find(localOption => localOption.id === option.id);

			if (!alreadySaved) {
				mergedOptions.push(option);
			}
		});

		// creating instances of elements, and returning those only which match the criteria
		return mergedOptions.reduce((items: T[], option) => {
			const instance = this.getInstance(option);
			if (this.checkCriteria(criteria, instance)) {
				items.push(instance);
			}
			return items;
		}, []);
	}

	// getting a single tem, just returning from store
	async get(id: string): Promise<T> {
		return this.getFromStore(id);
	}
}
