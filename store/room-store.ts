import { create } from "zustand";

interface RoomState {
  groupId: string | null;
  userEmail: string | null;
  setRoom: (groupId: string, userEmail: string) => void;
  clearRoom: () => void;
}

export const useRoomStore = create<RoomState>((set) => ({
  groupId: null,
  userEmail: null,
  setRoom: (groupId, userEmail) => set({ groupId, userEmail }),
  clearRoom: () => set({ groupId: null, userEmail: null }),
})); 