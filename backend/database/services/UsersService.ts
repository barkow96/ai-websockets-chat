import { UserDto, UserEntity } from "../types/users";
import { DatabaseService } from "./DatabaseService";

const usersService = new DatabaseService<UserEntity>("users.json", "users");

export const getAllUsers = (): UserDto[] => usersService.getAll();
export const getUserById = (id: string): UserDto | undefined => usersService.getById(id);
export const createUser = (user: Omit<UserEntity, "id">) => usersService.create(user);
export const updateUser = (id: string, updates: Partial<Omit<UserEntity, "id">>): UserDto | null => usersService.update(id, updates);
export const deleteUser = (id: string): boolean => usersService.delete(id);
