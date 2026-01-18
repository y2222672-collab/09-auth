import "server-only";
import { cookies } from "next/headers";
import { api } from "./api";
import { User } from "@/types/user";
import type { Note } from "@/types/note";

interface FetchNotesParams {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
}

export const fetchNotes = async (params: FetchNotesParams): Promise<Note[]> => {
  const cookieStore = await cookies();
  const { data } = await api.get<Note[]>("/notes", {
    params,
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const { data } = await api.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
};

export const checkSession = async (): Promise<User | null> => {
  const cookieStore = await cookies();
  try {
    const { data } = await api.get<User | null>("/auth/session", {
      headers: { Cookie: cookieStore.toString() },
    });
    return data || null;
  } catch {
    return null;
  }
};

export const getMeServer = async (): Promise<User | null> => {
  try {
    const cookieStore = await cookies();
    const allCookies = cookieStore.toString();

    const { data } = await api.get<User>("/users/me", {
      headers: {
        Cookie: allCookies,
      },
    });
    return data;
  } catch {
    return null;
  }
};

export const getMe = async (): Promise<User | null> => {
  const cookieStore = await cookies();
  try {
    const { data } = await api.get<User>("/users/me", {
      headers: { Cookie: cookieStore.toString() },
    });
    return data;
  } catch {
    return null;
  }
};
