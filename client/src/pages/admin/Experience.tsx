import { useState } from "react";

import AddButton from "../../components/admin/AddButton";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import EmptyState from "../../components/admin/EmptyState";
import FormModal from "../../components/admin/FormModal";
import PageHeader from "../../components/admin/PageHeader";
import TableSkeleton from "../../components/admin/TableSkeleton";
import ExperienceForm from "../../features/experience/components/ExperienceForm";
import ExperienceTable from "../../features/experience/components/ExperienceTable";
import { useCreateExperience } from "../../features/experience/hooks/useCreateExperience";
import { useDeleteExperience } from "../../features/experience/hooks/useDeleteExperience";
import { useExperiences } from "../../features/experience/hooks/useExperiences";
import { useUpdateExperience } from "../../features/experience/hooks/useUpdateExperience";
import { type Experience } from "../../features/experience/types/experience.types";
import { type ExperienceFormValues } from "../../features/experience/validation/experience.schema";
import { showError, showSuccess } from "../../utils/toast";

const splitCsv = (value?: string) =>
  value
    ?.split(",")
    .map((item) => item.trim())
    .filter(Boolean) ?? [];

const buildExperiencePayload = (values: ExperienceFormValues) => ({
  ...values,
  endDate: values.currentlyWorking ? undefined : values.endDate || undefined,
  technologies: splitCsv(values.technologies),
});

export default function Experience() {
  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<Experience | null>(null);
  const [deleting, setDeleting] = useState<Experience | null>(null);

  const { data, isLoading } = useExperiences();

  const createMutation = useCreateExperience();
  const updateMutation = useUpdateExperience();
  const deleteMutation = useDeleteExperience();

  return (
    <>
      <PageHeader
        title="Experience"
        description="Manage work experience."
        action={
          <AddButton
            label="Add Experience"
            onClick={() => setCreateOpen(true)}
          />
        }
      />

      {isLoading ? (
        <TableSkeleton />
      ) : !data?.length ? (
        <EmptyState
          title="No Experience"
          description="Add your first work experience"
        />
      ) : (
        <ExperienceTable
          experiences={data?.sort((a, b) => a.displayOrder - b.displayOrder)}
          onEdit={(experience) => setEditing(experience)}
          onDelete={(experience) => setDeleting(experience)}
        />
      )}

      <FormModal
        open={createOpen}
        title="Create Experience"
        onClose={() => setCreateOpen(false)}
      >
        <ExperienceForm
          loading={createMutation.isPending}
          onSubmit={(values) => {
            createMutation.mutate(buildExperiencePayload(values), {
              onSuccess: () => {
                setCreateOpen(false);
                showSuccess("Experience created");
              },
              onError: () => {
                showError("Create failed");
              },
            });
          }}
          totalExperiences={data?.length}
        />
      </FormModal>

      <FormModal
        open={!!editing}
        title="Edit Experience"
        onClose={() => setEditing(null)}
      >
        {editing && (
          <ExperienceForm
            defaultValues={editing}
            loading={updateMutation.isPending}
            onSubmit={(values) => {
              updateMutation.mutate(
                {
                  id: editing._id,
                  data: buildExperiencePayload(values),
                },
                {
                  onSuccess: () => {
                    setEditing(null);
                    showSuccess("Experience updated");
                  },
                  onError: () => {
                    showError("Update failed");
                  },
                },
              );
            }}
          />
        )}
      </FormModal>

      <ConfirmDialog
        open={!!deleting}
        title="Delete Experience"
        description="This action cannot be undone."
        onCancel={() => setDeleting(null)}
        onConfirm={() => {
          if (!deleting) return;

          deleteMutation.mutate(deleting._id, {
            onSuccess: () => {
              setDeleting(null);
              showSuccess("Experience deleted");
            },
            onError: () => {
              showError("Delete failed");
            },
          });
        }}
      />
    </>
  );
}
