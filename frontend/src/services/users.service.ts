import { User } from "@/types";

export const UsersService = {
  getUsers: async (): Promise<User[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);
    return response.json();
  },

  getUser: async (id: string): Promise<User | undefined> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`
    );
    return response.json();
  },

  createUser: async (user: User) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return response.json();
  },
} as const;
