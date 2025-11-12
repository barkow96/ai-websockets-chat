import { assureArray, assureString } from "@/mappers";
import { User } from "@/types";
import { get } from "lodash-es";

export const assureUser = (val: unknown): User => {
  const maybeId = get(val, "id");
  const maybeName = get(val, "name");
  const maybeAvatar = get(val, "avatar");

  return {
    id: assureString(maybeId, "assureUser.id"),
    name: assureString(maybeName, "assureUser.name"),
    avatar: assureString(maybeAvatar, "assureUser.avatar"),
  };
};

export const assureUsers = (val: unknown): User[] => {
  const maybeUsersArray = assureArray(val, "assureUsers.users");
  return maybeUsersArray.map(assureUser);
};
