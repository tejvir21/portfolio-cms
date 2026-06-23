import { useState } from "react";

import ConfirmDialog from "../../components/admin/ConfirmDialog";
import EmptyState from "../../components/admin/EmptyState";
import FormModal from "../../components/admin/FormModal";
import PageHeader from "../../components/admin/PageHeader";
import TableSkeleton from "../../components/admin/TableSkeleton";
import MessageTable from "../../features/contact/components/MessageTable";
import { useContacts } from "../../features/contact/hooks/useContacts";
import { useDeleteContact } from "../../features/contact/hooks/useDeleteContact";
import { type ContactMessage } from "../../features/contact/types/contact.types";
import { showError, showSuccess } from "../../utils/toast";

export default function Messages() {
  const [viewing, setViewing] = useState<ContactMessage | null>(null);
  const [deleting, setDeleting] = useState<ContactMessage | null>(null);

  const { data, isLoading } = useContacts();
  const deleteMutation = useDeleteContact();

  return (
    <>
      <PageHeader title="Messages" description="Manage contact messages." />

      {isLoading ? (
        <TableSkeleton />
      ) : !data?.length ? (
        <EmptyState title="No Messages" description="No contact messages yet" />
      ) : (
        <MessageTable
          messages={data}
          onView={(message) => setViewing(message)}
          onDelete={(message) => setDeleting(message)}
        />
      )}

      <FormModal
        open={!!viewing}
        title={viewing?.subject ?? "Message"}
        onClose={() => setViewing(null)}
      >
        {viewing && (
          <div className="space-y-5">
            <div>
              <p className="font-semibold">{viewing.name}</p>
              <a href={`mailto:${viewing.email}`} className="text-sky-400">
                {viewing.email}
              </a>
            </div>

            <p className="whitespace-pre-wrap rounded-xl border border-slate-800 bg-slate-900 p-4 text-slate-300">
              {viewing.message}
            </p>
          </div>
        )}
      </FormModal>

      <ConfirmDialog
        open={!!deleting}
        title="Delete Message"
        description="This action cannot be undone."
        onCancel={() => setDeleting(null)}
        onConfirm={() => {
          if (!deleting) return;

          deleteMutation.mutate(deleting._id, {
            onSuccess: () => {
              setDeleting(null);
              showSuccess("Message deleted");
            },
            onError: () => showError("Delete failed"),
          });
        }}
      />
    </>
  );
}
