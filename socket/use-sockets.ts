import { useCallback, useEffect, useState } from "react";
import { socket } from "./socket";

export function useSocket() {
  const [isConnected, setConnected] = useState(socket.connected);

  useEffect(() => {
    socket.connect();

    const onConnect = () => {
      console.log("🟢 Socket connected");
      setConnected(true);
    };

    const onDisconnect = () => {
      console.log("🔴 Socket disconnected");
      setConnected(false);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  // 🔹 emit helper (same as website)
  const emit = useCallback((event: string, payload?: any) => {
    if (!socket.connected) return;
    socket.emit(event, payload);
  }, []);

  // 🔹 subscribe helper (same as website)
  const subscribe = useCallback((event: string, cb: (data: any) => void) => {
    socket.on(event, cb);
    return () => socket.off(event, cb);
  }, []);

  return {
    socket, // optional (low-level access)
    isConnected, // ✅ matches website
    emit, // ✅ matches website
    subscribe, // ✅ matches website
  };
}
