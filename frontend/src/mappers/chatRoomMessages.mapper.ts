import { assureArray, assureDate, assureString } from "@/mappers";
import { Message } from "@/types";
import { get } from "lodash-es";

export const assureMessage = (val: unknown): Message => {
  const maybeId = get(val, "id");
  const maybeChatRoomId = get(val, "chatRoomId");
  const maybeText = get(val, "text");
  const maybeSenderId = get(val, "senderId");
  const maybeSenderName = get(val, "senderName");
  const maybeTimestamp = get(val, "timestamp");

  return {
    id: assureString(maybeId, "assureMessage.id"),
    chatRoomId: assureString(maybeChatRoomId, "assureMessage.chatRoomId"),
    text: assureString(maybeText, "assureMessage.text"),
    senderId: assureString(maybeSenderId, "assureMessage.senderId"),
    senderName: assureString(maybeSenderName, "assureMessage.senderName"),
    timestamp: assureDate(maybeTimestamp, "assureMessage.timestamp"),
  };
};

export const assureMessages = (val: unknown): Message[] => {
  const maybeMessagesArray = assureArray(val, "assureMessages.messages");
  return maybeMessagesArray.map(assureMessage);
};
