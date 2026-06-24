import { useState } from "react";

import PageHeader from "../../components/admin/PageHeader";
import AddButton from "../../components/admin/AddButton";
import FormModal from "../../components/admin/FormModal";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import TableSkeleton from "../../components/admin/TableSkeleton";
import EmptyState from "../../components/admin/EmptyState";

import CertificateCompanyForm, {
  type CertificateCompanyFormValues,
} from "../../features/certificates/components/CertificateCompanyForm";
import CertificateCompanyTable from "../../features/certificates/components/CertificateCompanyTable";

import { useCertificateCompanies } from "../../features/certificates/hooks/useCertificateCompanies";
import { useCreateCertificateCompany } from "../../features/certificates/hooks/useCreateCertificateCompany";
import { useUpdateCertificateCompany } from "../../features/certificates/hooks/useUpdateCertificateCompany";
import { useDeleteCertificateCompany } from "../../features/certificates/hooks/useDeleteCertificateCompany";

import { showError, showSuccess } from "../../utils/toast";

export default function CertificateCompanies() {
  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [deleting, setDeleting] = useState<any>(null);

  const { data, isLoading } = useCertificateCompanies();

  const createMutation = useCreateCertificateCompany();
  const updateMutation = useUpdateCertificateCompany();
  const deleteMutation = useDeleteCertificateCompany();

  return (
    <>
      <PageHeader
        title="Certificate Companies"
        description="Manage certificate brand logos used in the certificates section and certificate form."
        action={
          <AddButton label="Add Company" onClick={() => setCreateOpen(true)} />
        }
      />

      {isLoading ? (
        <TableSkeleton />
      ) : !data?.length ? (
        <EmptyState
          title="No Companies"
          description="Add your first certificate company logo"
        />
      ) : (
        <CertificateCompanyTable
          companies={data}
          onEdit={(company: any) => setEditing(company)}
          onDelete={(company: any) => setDeleting(company)}
        />
      )}

      {/* CREATE */}
      <FormModal
        open={createOpen}
        title="Create Certificate Company"
        onClose={() => setCreateOpen(false)}
      >
        <CertificateCompanyForm
          loading={createMutation.isPending}
          onSubmit={(values: CertificateCompanyFormValues) => {
            createMutation.mutate(values, {
              onSuccess: () => {
                setCreateOpen(false);
                showSuccess("Certificate company created");
              },
              onError: () => {
                showError("Failed to create certificate company");
              },
            });
          }}
        />
      </FormModal>

      {/* EDIT */}
      <FormModal
        open={!!editing}
        title="Edit Certificate Company"
        onClose={() => setEditing(null)}
      >
        <CertificateCompanyForm
          defaultValues={editing}
          loading={updateMutation.isPending}
          onSubmit={(values: CertificateCompanyFormValues) => {
            updateMutation.mutate(
              {
                id: editing._id,
                data: values,
              },
              {
                onSuccess: () => {
                  setEditing(null);
                  showSuccess("Certificate company updated");
                },
                onError: () => {
                  showError("Failed to update certificate company");
                },
              },
            );
          }}
        />
      </FormModal>

      {/* DELETE */}
      <ConfirmDialog
        open={!!deleting}
        title="Delete Certificate Company"
        description="This action cannot be undone."
        onCancel={() => setDeleting(null)}
        onConfirm={() => {
          deleteMutation.mutate(deleting._id, {
            onSuccess: () => {
              setDeleting(null);
              showSuccess("Certificate company deleted");
            },
            onError: () => {
              showError("Failed to delete certificate company");
            },
          });
        }}
      />
    </>
  );
}
