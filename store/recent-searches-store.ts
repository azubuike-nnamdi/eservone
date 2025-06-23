import { useAuthStore } from "@/store/auth-store";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RecentSearchesState {
  recent: string[];
  addSearch: (term: string) => void;
  clear: () => void;
}

export const useRecentSearchesStore = create<RecentSearchesState>()(
  persist(
    (set, get) => ({
      recent: [],
      addSearch: (term) => {
        // Don't add "all" or empty, and avoid duplicates
        if (!term || term.toLowerCase() === "all") return;
        set((state) => ({
          recent: [
            term,
            ...state.recent.filter((item) => item.toLowerCase() !== term.toLowerCase()),
          ].slice(0, 10), // keep max 10
        }));
      },
      clear: () => set({ recent: [] }),
    }),
    {
      name: `recent-searches-${useAuthStore.getState().user?.id || "guest"}`,
    }
  )
);
