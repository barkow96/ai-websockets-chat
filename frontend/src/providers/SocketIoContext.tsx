import { ChatMessageEventsData, OChatEvent } from "@/types";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";

export const SocketIoContext = createContext<{ socket: Socket | null }>({
  socket: null,
});

export const SocketIoProvider = ({ children }: PropsWithChildren) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(`${process.env.NEXT_PUBLIC_API_URL}`);
    setSocket(newSocket);

    newSocket.emit("client-message", "Hello from the client");

    newSocket.on(OChatEvent.MessageNew, (data: ChatMessageEventsData) => {
      console.log("Received new message on frontend!", data);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <SocketIoContext.Provider value={{ socket }}>
      {children}
    </SocketIoContext.Provider>
  );
};

export const useSocketIo = () => {
  const context = useContext(SocketIoContext);
  if (!context) {
    throw new Error("useSocketIo must be used within a SocketIoProvider");
  }

  return context;
};
