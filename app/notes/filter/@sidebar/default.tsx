import React from "react";
import Link from "next/link";
import { NoteTag } from "@/types/note";
import css from "./Sidebar.module.css";
const NAV_ITEMS: { label: string; value: NoteTag | "all" }[] = [
  { label: "All notes", value: "all" },
  { label: "Todo", value: "Todo" },
  { label: "Work", value: "Work" },
  { label: "Personal", value: "Personal" },
  { label: "Meeting", value: "Meeting" },
  { label: "Shopping", value: "Shopping" },
];

export default function SidebarDefault() {
  return (
    <aside className={css.sidebar}>
      <nav aria-label="Notes filter navigation">
        <ul className={css.list}>
          {NAV_ITEMS.map((item) => (
            <li key={item.value} className={css.listItem}>
              <Link href={`/notes/filter/${item.value}`} className={css.link}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
