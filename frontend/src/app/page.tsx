import { ChatRoomsService, UsersService } from "@/services";
import { ChatView } from "@/views";

export default async function Home() {
  const chatRooms = await (async () => {
    try {
      const rooms = await ChatRoomsService.getChatRooms();
      return rooms;
    } catch (error) {
      console.error("Failed to fetch chat rooms:", error);
    }
  })();

  const users = await (async () => {
    try {
      const users = await UsersService.getUsers();
      return users;
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  })();

  return <ChatView users={users || []} chatRooms={chatRooms || []} />;
}
