import { useState } from "react";

import PageHeader from "../../components/admin/PageHeader";

import AddButton from "../../components/admin/AddButton";

import FormModal from "../../components/admin/FormModal";

import ConfirmDialog from "../../components/admin/ConfirmDialog";

import TableSkeleton from "../../components/admin/TableSkeleton";

import EmptyState from "../../components/admin/EmptyState";

import ProjectForm from "../../features/projects/components/ProjectForm";

import ProjectTable from "../../features/projects/components/ProjectTable";

import { useProjects } from "../../features/projects/hooks/useProjects";

import { useCreateProject } from "../../features/projects/hooks/useCreateProject";

import { useDeleteProject } from "../../features/projects/hooks/useDeleteProject";

import { useUpdateProject } from "../../features/projects/hooks/useUpdateProject";
import { type ProjectFormValues } from "../../features/projects/validation/project.schema";
import { showError, showSuccess } from "../../utils/toast";

const splitCsv = (value?: string) =>
  value
    ?.split(",")
    .map((item) => item.trim())
    .filter(Boolean) ?? [];

const buildProjectPayload = (values: ProjectFormValues) => ({
  ...values,
  technologies: splitCsv(values.technologies),
  gallery: splitCsv(values.gallery),
});

export default function Projects() {
  const [createOpen, setCreateOpen] = useState(false);

  const [editing, setEditing] = useState<any>(null);

  const [deleting, setDeleting] = useState<any>(null);

  const { data, isLoading } = useProjects();

  const createMutation = useCreateProject();

  const updateMutation = useUpdateProject();

  const deleteMutation = useDeleteProject();

  return (
    <>
      <PageHeader
        title="Projects"
        description="Manage portfolio projects"
        action={
          <AddButton label="Add Project" onClick={() => setCreateOpen(true)} />
        }
      />

      {isLoading ? (
        <TableSkeleton />
      ) : !data?.length ? (
        <EmptyState
          title="No Projects"
          description="Create your first project"
        />
      ) : (
        <ProjectTable
          projects={data}
          onEdit={(project) => setEditing(project)}
          onDelete={(project) => setDeleting(project)}
        />
      )}

      {/* CREATE */}

      <FormModal
        open={createOpen}
        title="Create Project"
        onClose={() => setCreateOpen(false)}
      >
        <ProjectForm
          loading={createMutation.isPending}
          onSubmit={(values) => {
            const payload = buildProjectPayload(values);

            createMutation.mutate(payload, {
              onSuccess: () => {
                setCreateOpen(false);
                showSuccess("Project Created");
              },
              onError: () => {
                showError("Create failed");
              },
            });
          }}
        />
      </FormModal>

      {/* EDIT */}

      <FormModal
        open={!!editing}
        title="Edit Project"
        onClose={() => setEditing(null)}
      >
        <ProjectForm
          defaultValues={editing}
          loading={updateMutation.isPending}
          onSubmit={(values) => {
            const data = buildProjectPayload(values);

            updateMutation.mutate(
              {
                id: editing._id,
                data,
              },
              {
                onSuccess: () => {
                  setEditing(null);
                  showSuccess("Project Updated");
                },
                onError: () => {
                  showError("Update failed");
                },
              },
            );
          }}
        />
      </FormModal>

      {/* DELETE */}

      <ConfirmDialog
        open={!!deleting}
        title="Delete Project"
        description="This action cannot be undone."
        onCancel={() => setDeleting(null)}
        onConfirm={() => {
          deleteMutation.mutate(deleting._id, {
            onSuccess: () => {
              showSuccess("Project deleted");
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
