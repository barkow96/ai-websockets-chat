import { assureUser, assureUsers } from "@/mappers";
import { User } from "@/types";

export const UsersService = {
  getUsers: async (): Promise<User[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);

    const maybeUsers = await response.json();
    return assureUsers(maybeUsers);
  },

  getUser: async (id: string): Promise<User | undefined> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`
    );

    const maybeUser = await response.json();
    return assureUser(maybeUser);
  },

  createUser: async (user: User) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const maybeUser = await response.json();
    return assureUser(maybeUser);
  },
} as const;
