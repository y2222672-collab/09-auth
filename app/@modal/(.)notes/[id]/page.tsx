import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NotePreviewClient from "./NotePreview.client";

export default async function NoteModalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient id={id} />
    </HydrationBoundary>
  );
}
// "use client";

// import { use } from "react";
// import { useRouter } from "next/navigation";
// import Modal from "@/components/Modal/Modal";
// import NotePreview from "@/components/NotePreview/NotePreview";

// interface PageProps {
//   params: Promise<{ id: string }>;
// }

// export default function NoteModalPage({ params }: PageProps) {
//   const router = useRouter();

//   const { id } = use(params);

//   return (
//     <Modal onClose={() => router.back()}>
//       <NotePreview id={id} />
//     </Modal>
//   );
// }
