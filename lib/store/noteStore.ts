import { create } from "zustand";
import { persist } from "zustand/middleware";
import { NoteTag } from "@/types/note";

interface NoteDraft {
  title: string;
  content: string;
  tag: NoteTag;
}

interface NoteState {
  draft: NoteDraft;
  setDraft: (data: Partial<NoteDraft>) => void;
  clearDraft: () => void;
}

const initialDraft: NoteDraft = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useNoteStore = create<NoteState>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (data) =>
        set((state) => ({
          draft: { ...state.draft, ...data },
        })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "note-storage",
    }
  )
);
