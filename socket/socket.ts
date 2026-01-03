import { io, Socket } from "socket.io-client";

export const socket: Socket = io(process.env.EXPO_PUBLIC_API_URL, {
  transports: ["websocket"],
  autoConnect: false, // we control when to connect
  reconnection: true,
  reconnectionAttempts: Infinity,
  withCredentials: true,
});
