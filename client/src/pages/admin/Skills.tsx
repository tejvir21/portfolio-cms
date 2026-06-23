import { useState } from "react";

import AddButton from "../../components/admin/AddButton";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import EmptyState from "../../components/admin/EmptyState";
import FormModal from "../../components/admin/FormModal";
import PageHeader from "../../components/admin/PageHeader";
import TableSkeleton from "../../components/admin/TableSkeleton";
import SkillForm from "../../features/skills/components/SkillForm";
import SkillTable from "../../features/skills/components/SkillTable";
import { useCreateSkill } from "../../features/skills/hooks/useCreateSkill";
import { useDeleteSkill } from "../../features/skills/hooks/useDeleteSkill";
import { useSkills } from "../../features/skills/hooks/useSkills";
import { useUpdateSkill } from "../../features/skills/hooks/useUpdateSkill";
import { type Skill } from "../../features/skills/types/skill.types";
import { type SkillFormValues } from "../../features/skills/validation/skill.schema";
import { showError, showSuccess } from "../../utils/toast";

export default function Skills() {
  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<Skill | null>(null);
  const [deleting, setDeleting] = useState<Skill | null>(null);

  const { data, isLoading } = useSkills();
  const createMutation = useCreateSkill();
  const updateMutation = useUpdateSkill();
  const deleteMutation = useDeleteSkill();

  const submitData = (values: SkillFormValues) => ({
    ...values,
    icon: "",
  });

  return (
    <>
      <PageHeader
        title="Skills"
        description="Manage technical skills."
        action={<AddButton label="Add Skill" onClick={() => setCreateOpen(true)} />}
      />

      {isLoading ? (
        <TableSkeleton />
      ) : !data?.length ? (
        <EmptyState title="No Skills" description="Create your first skill" />
      ) : (
        <SkillTable
          skills={data}
          onEdit={(skill) => setEditing(skill)}
          onDelete={(skill) => setDeleting(skill)}
        />
      )}

      <FormModal
        open={createOpen}
        title="Create Skill"
        onClose={() => setCreateOpen(false)}
      >
        <SkillForm
          loading={createMutation.isPending}
          onSubmit={(values) => {
            createMutation.mutate(submitData(values), {
              onSuccess: () => {
                setCreateOpen(false);
                showSuccess("Skill created");
              },
              onError: () => showError("Create failed"),
            });
          }}
        />
      </FormModal>

      <FormModal
        open={!!editing}
        title="Edit Skill"
        onClose={() => setEditing(null)}
      >
        {editing && (
          <SkillForm
            defaultValues={editing}
            loading={updateMutation.isPending}
            onSubmit={(values) => {
              updateMutation.mutate(
                { id: editing._id, data: submitData(values) },
                {
                  onSuccess: () => {
                    setEditing(null);
                    showSuccess("Skill updated");
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
        title="Delete Skill"
        description="This action cannot be undone."
        onCancel={() => setDeleting(null)}
        onConfirm={() => {
          if (!deleting) return;

          deleteMutation.mutate(deleting._id, {
            onSuccess: () => {
              setDeleting(null);
              showSuccess("Skill deleted");
            },
            onError: () => showError("Delete failed"),
          });
        }}
      />
    </>
  );
}
