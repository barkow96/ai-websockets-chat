import { ChatRoomsService, UsersService } from "@/services";
import { ChatView } from "@/views";

export default async function Home() {
  const users = await UsersService.getUsers();
  const chatRooms = await ChatRoomsService.getChatRooms();

  return <ChatView users={users} chatRooms={chatRooms} />;
}
