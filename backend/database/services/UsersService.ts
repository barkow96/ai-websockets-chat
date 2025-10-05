import { User } from "../types/users";
import { DatabaseService } from "./DatabaseService";

const usersService = new DatabaseService<User>("users.json", "users");

export const getAllUsers = () => usersService.getAll();
export const getUserById = (id: string) => usersService.getById(id);
export const createUser = (user: Omit<User, "id">) => usersService.create(user);
export const updateUser = (id: string, updates: Partial<Omit<User, "id">>) => usersService.update(id, updates);
export const deleteUser = (id: string) => usersService.delete(id);
