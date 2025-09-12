import { create } from "zustand";
import { io } from "socket.io-client";

const useSocketStore = create((set, get) => ({
  socket: null,

  initSocket: () => {
    if (!get().socket) {
      // no socket then create it
      const socket = io("http://localhost:3001", {
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
