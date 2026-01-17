"use client";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api";
import type { Note } from "@/types/note";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
}

const NoteList = ({ notes }: NoteListProps) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  if (notes.length === 0) {
    return (
      <div className={css.emptyContainer}>
        <div className={css.emptyIcon}>🔍</div>
        <h3 className={css.emptyTitle}>No notes found</h3>
        <p className={css.emptyText}>
          We couldn't find anything matching your search. Try using different
          keywords.
        </p>
      </div>
    );
  }

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <div className={css.contentWrapper}>
            <h3 className={css.title}>{note.title}</h3>
            <p className={css.content}>
              {note.content.length > 100
                ? `${note.content.substring(0, 100)}...`
                : note.content}
            </p>

            <Link href={`/notes/${note.id}`} className={css.detailsLink}>
              View details
            </Link>
          </div>

          <footer className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button
              className={css.deleteBtn}
              onClick={() => {
                if (confirm("Are you sure?")) {
                  deleteMutation.mutate(note.id);
                }
              }}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </button>
          </footer>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
