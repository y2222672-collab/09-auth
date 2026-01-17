"use client";
import Link from "next/link";
import { useParams } from "next/navigation";

import css from "../SidebarNotes.module.css";
const TAGS = ["all", "Work", "Personal", "Todo", "Shopping"];

export default function SidebarNotes() {
  const params = useParams();
  const currentTag = params.slug?.[0] || "all";

  return (
    <aside className={css.sidebar}>
      <ul className={css.menuList}>
        {TAGS.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <Link
              href={`/notes/filter/${tag}`}
              className={`${css.menuLink} ${
                currentTag === tag ? css.active : ""
              }`}
            >
              {tag === "all" ? "All notes" : tag}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
