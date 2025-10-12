import { ChatRoomsService, UsersService } from "@/services";
import { ChatView } from "@/views";
import { Box } from "@chakra-ui/react";

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

  return (
    <Box width="100%" maxWidth="1200px" margin="0 auto">
      <ChatView users={users || []} chatRooms={chatRooms || []} />
    </Box>
  );
}
