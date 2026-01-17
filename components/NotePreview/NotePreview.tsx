"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import css from "./NotePreview.module.css";

export default function NotePreview({ id }: { id: string }) {
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <Loader />;
  if (isError || !note) return <ErrorMessage message="Note not found" />;

  return (
    <div className={css.previewContainer}>
      <h2 className={css.title}>{note.title}</h2>
      <div className={css.tagBadge}>{note.tag}</div>
      <div className={css.content}>{note.content}</div>
    </div>
  );
}
