import { api } from "./api";
import { User } from "@/types/user";
import { NoteTag } from "@/types/note";

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: NoteTag;
}

interface AuthResponse {
  user: User;
}

interface RegisterCredentials {
  email: string;
  password: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

// --- Функції API ---

export const register = async (
  credentials: RegisterCredentials,
): Promise<User> => {
  const { data } = await api.post<AuthResponse>("/auth/register", credentials);
  return data.user;
};

export const login = async (credentials: LoginCredentials): Promise<User> => {
  const { data } = await api.post<AuthResponse>("/auth/login", credentials);
  return data.user;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const checkSession = async (): Promise<User | null> => {
  const { data } = await api.get<User | null>("/auth/session");
  return data || null;
};

// --- Функції для нотаток ---

export const fetchNotes = async (
  params: FetchNotesParams,
): Promise<FetchNotesResponse> => {
  const { data } = await api.get<FetchNotesResponse>("/notes", { params });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (noteData: {
  title: string;
  content?: string;
  tag: NoteTag;
}): Promise<Note> => {
  const { data } = await api.post<Note>("/notes", noteData);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};
//  Профіль
export const updateMe = async (userData: {
  username: string;
}): Promise<User> => {
  const { data } = await api.patch<User>("/users/me", userData);
  return data;
};
