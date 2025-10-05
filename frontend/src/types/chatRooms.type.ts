import { User } from "./users.type";

export type ChatRoom = {
  id: string;
  name: string;
  description: string;
  users: User[];
};
