"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import css from "./NoteDetails.module.css";

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <Loader />;

  if (isError) return <ErrorMessage message={error.message} />;

  if (!note) return <p className={css.notFound}>Note not found.</p>;

  return (
    <main className={css.container}>
      <article className={css.noteCard}>
        <header className={css.header}>
          <h1 className={css.title}>{note.title}</h1>
          <span className={css.tag}>{note.tag}</span>
        </header>
        <div className={css.content}>
          <p>{note.content}</p>
        </div>
      </article>
    </main>
  );
}
