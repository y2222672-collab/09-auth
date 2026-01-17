"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import css from "./NotePreview.module.css";

export default function NotePreviewClient({ id }: { id: string }) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  return (
    <Modal onClose={() => router.back()}>
      <div className={css.previewContainer}>
        {isLoading && (
          <div className={css.center}>
            <Loader />
          </div>
        )}

        {isError && (
          <ErrorMessage message="Failed to load note details. Please try again later." />
        )}

        {!isLoading && !isError && note && (
          <>
            <h2 className={css.title}>{note.title}</h2>
            <div className={css.meta}>
              <span className={css.tag}>{note.tag}</span>
            </div>
            <p className={css.content}>{note.content}</p>
          </>
        )}

        {!isLoading && !isError && !note && (
          <p className={css.empty}>Note not found.</p>
        )}
      </div>
    </Modal>
  );
}
// "use client";

// import { useQuery } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
// import { fetchNoteById } from "@/lib/api";
// import Modal from "@/components/Modal/Modal";
// import css from "./NotePreview.module.css";

// export default function NotePreviewClient({ id }: { id: string }) {
//   const router = useRouter();

//   const { data: note, isLoading } = useQuery({
//     queryKey: ["note", id],
//     queryFn: () => fetchNoteById(id),
//     refetchOnMount: false,
//   });

//   if (isLoading) return null;

//   return (
//     <Modal onClose={() => router.back()}>
//       <div className={css.previewContainer}>
//         {note ? (
//           <>
//             <h2 className={css.title}>{note.title}</h2>
//             <span className={css.tag}>{note.tag}</span>
//             <p className={css.content}>{note.content}</p>
//           </>
//         ) : (
//           <p>Note not found</p>
//         )}
//       </div>
//     </Modal>
//   );
// }
