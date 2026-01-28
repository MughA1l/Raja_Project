import { create } from "zustand";
import { io } from "socket.io-client";

const useSocketStore = create((set, get) => ({
  socket: null,

  initSocket: () => {
    if (!get().socket) {
      // no socket then create it
      const socketUrl = import.meta.env.VITE_SOCKET_URL || "http://localhost:3000";
      const socket = io(socketUrl, {
        transports: ["websocket"],
      });
      set({ socket });

      socket.on("connect", () => {
        console.log("Connected:", socket.id);
      });

      socket.on("disconnect", () => {
        console.log("Disconnected with sockets");
      });
    }
  },

  disconnectSocket: () => {
    const socket = get().socket;
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },
}));

export default useSocketStore;
