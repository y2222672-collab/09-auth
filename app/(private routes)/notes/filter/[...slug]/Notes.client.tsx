"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { fetchNotes } from "@/lib/api/clientApi";
import { NoteTag } from "@/types/note";
import { useAuthStore } from "@/lib/store/authStore";
import css from "../../NotesPage.module.css";

import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";

interface NotesClientProps {
  activeTag?: NoteTag;
}

export default function FilteredNotesClient({ activeTag }: NotesClientProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [debouncedSearch] = useDebounce(search, 500);

  const { isAuthenticated } = useAuthStore();

  const { data, isFetching, isError } = useQuery({
    queryKey: ["notes", page, activeTag, debouncedSearch],
    queryFn: () =>
      fetchNotes({
        page,
        tag: activeTag,
        search: debouncedSearch,
      }),
    placeholderData: keepPreviousData,
    enabled: isAuthenticated,
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className={css.container}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />

        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      {isFetching && !data && isAuthenticated && (
        <div className={css.loaderContainer}>
          <Loader />
        </div>
      )}

      {isError && (
        <ErrorMessage message="Failed to load notes. Please try again." />
      )}

      {data && data.notes.length > 0 ? (
        <NoteList notes={data.notes} />
      ) : (
        !isFetching &&
        isAuthenticated && <p className={css.empty}>No notes found.</p>
      )}

      {data && data.totalPages > 1 && (
        <div className={css.paginationWrapper}>
          <Pagination
            totalPages={data.totalPages}
            currentPage={page}
            onChange={(newPage) => setPage(newPage)}
          />
        </div>
      )}
    </div>
  );
}
