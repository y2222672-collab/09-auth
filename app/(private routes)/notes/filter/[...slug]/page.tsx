import React from "react";

import { NoteTag } from "@/types/note";
import FilteredNotesClient from "./Notes.client";
import { Metadata } from "next";
interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0];

  return {
    title: `Notes: ${tag} | NoteHub`,
    description: `View all notes categorized under ${tag}.`,
    openGraph: {
      title: `Filtered Notes - ${tag}`,
      description: `Browse through your ${tag} collection.`,
      images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
    },
  };
}
export default async function FilterPage({ params }: PageProps) {
  const { slug } = await params;
  const tagFromUrl = slug[0];

  const activeTag = (tagFromUrl === "all" ? undefined : tagFromUrl) as
    | NoteTag
    | undefined;

  return (
    <main style={{ padding: "0 20px" }}>
      <h1 style={{ fontSize: "24px", margin: "20px 0" }}>
        Notes: {tagFromUrl === "all" ? "All" : tagFromUrl}
      </h1>

      <FilteredNotesClient activeTag={activeTag} />
    </main>
  );
}
