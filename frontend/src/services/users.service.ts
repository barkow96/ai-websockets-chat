import { assureUser, assureUsers } from "@/mappers";
import { User } from "@/types";
import { enhancedFetch } from "@/utils";

export const UsersService = {
  getUsers: async (): Promise<User[]> => {
    const maybeUsers = await enhancedFetch<User[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/users`
    );
    if (!maybeUsers) return [];
    return assureUsers(maybeUsers);
  },

  getUser: async (id: string): Promise<User | undefined> => {
    const maybeUser = await enhancedFetch<User>(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`
    );

    if (!maybeUser) return;
    return assureUser(maybeUser);
  },

  createUser: async (user: User): Promise<User | undefined> => {
    const maybeUser = await enhancedFetch<User>(
      `${process.env.NEXT_PUBLIC_API_URL}/users`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );

    if (!maybeUser) return;
    return assureUser(maybeUser);
  },
} as const;
