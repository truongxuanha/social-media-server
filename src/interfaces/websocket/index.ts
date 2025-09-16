import { Server, Socket } from "socket.io";

export const initializeSocketServer = (io: any) => {
  io.use("connection", (socket: Socket, next: () => void) => {
    next();
  });

  io.on("connection", (socket: Socket) => {
    console.log("New client connected:", socket.id);


    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};
