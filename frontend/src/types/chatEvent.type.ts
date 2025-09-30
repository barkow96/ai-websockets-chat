export const OChatEvent = {
  Watch: "chat-watch",
  Unwatch: "chat-unwatch",
  MessageNew: "chat-message-new",
  MessageDelete: "chat-message-delete",
} as const;

export type ChatEvent = (typeof OChatEvent)[keyof typeof OChatEvent];

export type ChatWatchEventsData = {
  chatRoomId: string;
};

export type ChatMessageEventsData = {
  chatRoomId: string;
  message: string;
  senderId: string;
  timestamp: Date;
};
