import { assureArray, assureString, assureUsers } from "@/mappers";
import { ChatRoom } from "@/types";
import { get } from "lodash-es";

export const assureChatRoom = (val: unknown): ChatRoom => {
  const maybeId = get(val, "id");
  const maybeName = get(val, "name");
  const maybeDescription = get(val, "description");
  const maybeUsers = get(val, "users");

  return {
    id: assureString(maybeId, "assureChatRoom.id"),
    name: assureString(maybeName, "assureChatRoom.name"),
    description: assureString(maybeDescription, "assureChatRoom.description"),
    users: assureUsers(maybeUsers),
  };
};

export const assureChatRooms = (val: unknown): ChatRoom[] => {
  const maybeChatRoomsArray = assureArray(val, "assureChatRooms.chatRooms");
  return maybeChatRoomsArray.map(assureChatRoom);
};
