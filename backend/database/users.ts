import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

type User = {
	id: string;
	name: string;
	avatar: string;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_DIR = join(__dirname, "data");
const USERS_FILE = join(DATA_DIR, "users.json");

const readUsersFromFile = (): User[] => {
	try {
		const data = readFileSync(USERS_FILE, "utf8");
		return JSON.parse(data);
	} catch (error) {
		console.error("Error reading users file:", error);
		return [];
	}
};

const writeUsersToFile = (users: User[]): void => {
	try {
		writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
	} catch (error) {
		console.error("Error writing users file:", error);
	}
};

export const getAllUsers = (): User[] => {
	return readUsersFromFile();
};

export const getUserById = (id: string): User | undefined => {
	const users = readUsersFromFile();
	return users.find((user) => user.id === id);
};

export const createUser = (user: Omit<User, "id">): User => {
	const users = readUsersFromFile();
	const newUser: User = {
		...user,
		id: Date.now().toString(),
	};
	users.push(newUser);
	writeUsersToFile(users);
	return newUser;
};

export const updateUser = (id: string, updates: Partial<Omit<User, "id">>): User | null => {
	const users = readUsersFromFile();
	const userIndex = users.findIndex((user) => user.id === id);

	if (userIndex === -1) {
		return null;
	}

	users[userIndex] = { ...users[userIndex], ...updates };
	writeUsersToFile(users);
	return users[userIndex];
};

export const deleteUser = (id: string): boolean => {
	const users = readUsersFromFile();
	const userIndex = users.findIndex((user) => user.id === id);

	if (userIndex === -1) {
		return false;
	}

	users.splice(userIndex, 1);
	writeUsersToFile(users);
	return true;
};
