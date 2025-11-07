import { Socket } from "socket.io";

export const initializeSocketServer = (io: any) => {
  io.use("connection", (socket: Socket, next: () => void) => {
    next();
  });

  io.on("connection", (socket: Socket) => {
    // Handle disconnection
    socket.on("disconnect", () => {});
  });
};
