import css from "./not-found.module.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "NoteHub | Page Not Found",
  description: "Sorry, this page does not exist. Go back to your notes.",
  openGraph: {
    title: "NoteHub | Page Not Found",
    description: "The page you are looking for was not found.",
    url: "https://08-zustand-vert-mu.vercel.app/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      },
    ],
  },
};

export default function NotFound() {
  return (
    <main className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/notes/filter/all" className={css.link}>
        Back to all notes
      </Link>
    </main>
  );
}
