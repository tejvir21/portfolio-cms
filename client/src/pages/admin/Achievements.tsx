import { useState } from "react";

import AddButton from "../../components/admin/AddButton";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import EmptyState from "../../components/admin/EmptyState";
import FormModal from "../../components/admin/FormModal";
import PageHeader from "../../components/admin/PageHeader";
import TableSkeleton from "../../components/admin/TableSkeleton";
import AchievementForm from "../../features/achievements/components/AchievementForm";
import AchievementTable from "../../features/achievements/components/AchievementTable";
import { useAchievements } from "../../features/achievements/hooks/useAchievements";
import { useCreateAchievement } from "../../features/achievements/hooks/useCreateAchievement";
import { useDeleteAchievement } from "../../features/achievements/hooks/useDeleteAchievement";
import { useUpdateAchievement } from "../../features/achievements/hooks/useUpdateAchievement";
import { type Achievement } from "../../features/achievements/types/achievement.types";
import { type AchievementFormValues } from "../../features/achievements/validation/achievement.schema";
import { showError, showSuccess } from "../../utils/toast";

const buildPayload = (values: AchievementFormValues) => ({
  ...values,
  date: values.date || undefined,
});

export default function Achievements() {
  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<Achievement | null>(null);
  const [deleting, setDeleting] = useState<Achievement | null>(null);

  const { data, isLoading } = useAchievements();
  const createMutation = useCreateAchievement();
  const updateMutation = useUpdateAchievement();
  const deleteMutation = useDeleteAchievement();

  return (
    <>
      <PageHeader
        title="Achievements"
        description="Manage achievements."
        action={
          <AddButton label="Add Achievement" onClick={() => setCreateOpen(true)} />
        }
      />

      {isLoading ? (
        <TableSkeleton />
      ) : !data?.length ? (
        <EmptyState
          title="No Achievements"
          description="Create your first achievement"
        />
      ) : (
        <AchievementTable
          achievements={data}
          onEdit={(achievement) => setEditing(achievement)}
          onDelete={(achievement) => setDeleting(achievement)}
        />
      )}

      <FormModal
        open={createOpen}
        title="Create Achievement"
        onClose={() => setCreateOpen(false)}
      >
        <AchievementForm
          loading={createMutation.isPending}
          onSubmit={(values) => {
            createMutation.mutate(buildPayload(values), {
              onSuccess: () => {
                setCreateOpen(false);
                showSuccess("Achievement created");
              },
              onError: () => showError("Create failed"),
            });
          }}
        />
      </FormModal>

      <FormModal
        open={!!editing}
        title="Edit Achievement"
        onClose={() => setEditing(null)}
      >
        {editing && (
          <AchievementForm
            defaultValues={editing}
            loading={updateMutation.isPending}
            onSubmit={(values) => {
              updateMutation.mutate(
                { id: editing._id, data: buildPayload(values) },
                {
                  onSuccess: () => {
                    setEditing(null);
                    showSuccess("Achievement updated");
                  },
                  onError: () => showError("Update failed"),
                },
              );
            }}
          />
        )}
      </FormModal>

      <ConfirmDialog
        open={!!deleting}
        title="Delete Achievement"
        description="This action cannot be undone."
        onCancel={() => setDeleting(null)}
        onConfirm={() => {
          if (!deleting) return;

          deleteMutation.mutate(deleting._id, {
            onSuccess: () => {
              setDeleting(null);
              showSuccess("Achievement deleted");
            },
            onError: () => showError("Delete failed"),
          });
        }}
      />
    </>
  );
}
