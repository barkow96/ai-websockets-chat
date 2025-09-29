import { createContext, PropsWithChildren, useContext, useState } from "react";
import { io, Socket } from "socket.io-client";

export const SocketIoContext = createContext<{ socket: Socket | null }>({
  socket: null,
});

export const SocketIoProvider = ({ children }: PropsWithChildren) => {
  const [socket] = useState<Socket>(io("http://localhost:3001"));

  socket.emit("client-message", "Hello from the client");

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
