import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

interface Entity {
	id: string;
}

export class DatabaseService<T extends Entity> {
	private filePath: string;
	private entityName: string;

	constructor(fileName: string, entityName: string) {
		const __filename = fileURLToPath(import.meta.url);
		const __dirname = dirname(__filename);
		const DATA_DIR = join(__dirname, "..", "data");
		this.filePath = join(DATA_DIR, fileName);
		this.entityName = entityName;
	}

	private readFromFile(): T[] {
		try {
			const data = readFileSync(this.filePath, "utf8");
			return JSON.parse(data);
		} catch (error) {
			console.error(`Error reading ${this.entityName} file:`, error);
			return [];
		}
	}

	private writeToFile(items: T[]): void {
		try {
			writeFileSync(this.filePath, JSON.stringify(items, null, 2));
		} catch (error) {
			console.error(`Error writing ${this.entityName} file:`, error);
		}
	}

	private generateId(): string {
		return Date.now().toString();
	}

	public getAll(): T[] {
		return this.readFromFile();
	}

	public getById(id: string): T | undefined {
		const items = this.readFromFile();
		return items.find((item) => item.id === id);
	}

	public create(item: Omit<T, "id">): T {
		const items = this.readFromFile();

		const newItem = {
			...item,
			id: this.generateId(),
		} as T;

		items.push(newItem);
		this.writeToFile(items);
		return newItem;
	}

	public update(id: string, updates: Partial<Omit<T, "id">>): T | null {
		const items = this.readFromFile();
		const itemIndex = items.findIndex((item) => item.id === id);

		if (itemIndex === -1) {
			return null;
		}

		items[itemIndex] = { ...items[itemIndex], ...updates };
		this.writeToFile(items);
		return items[itemIndex];
	}

	public delete(id: string): boolean {
		const items = this.readFromFile();
		const itemIndex = items.findIndex((item) => item.id === id);

		if (itemIndex === -1) {
			return false;
		}

		items.splice(itemIndex, 1);
		this.writeToFile(items);
		return true;
	}

	public findBy<K extends keyof T>(field: K, value: T[K]): T[] {
		const items = this.readFromFile();
		return items.filter((item) => item[field] === value);
	}

	public deleteBy<K extends keyof T>(field: K, value: T[K]): number {
		const items = this.readFromFile();
		const initialLength = items.length;
		const filteredItems = items.filter((item) => item[field] !== value);
		const deletedCount = initialLength - filteredItems.length;
		this.writeToFile(filteredItems);
		return deletedCount;
	}
}
