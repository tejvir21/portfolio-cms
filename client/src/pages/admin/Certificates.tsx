import { useState } from "react";

import AddButton from "../../components/admin/AddButton";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import EmptyState from "../../components/admin/EmptyState";
import FormModal from "../../components/admin/FormModal";
import PageHeader from "../../components/admin/PageHeader";
import TableSkeleton from "../../components/admin/TableSkeleton";

import CertificateForm from "../../features/certificates/components/CertificateForm";
import CertificateTable from "../../features/certificates/components/CertificateTable";

import { useCertificates } from "../../features/certificates/hooks/useCertificates";
import { useCreateCertificate } from "../../features/certificates/hooks/useCreateCertificate";
import { useDeleteCertificate } from "../../features/certificates/hooks/useDeleteCertificate";
import { useUpdateCertificate } from "../../features/certificates/hooks/useUpdateCertificate";

import { type Certificate } from "../../features/certificates/types/certificate.types";
import { type CertificateFormValues } from "../../features/certificates/validation/certificate.schema";

import { showError, showSuccess } from "../../utils/toast";
import type { CertificatePayload } from "@/features/certificates/api/certificate.api";

export default function Certificates() {
  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<Certificate | null>(null);
  const [deleting, setDeleting] = useState<Certificate | null>(null);

  const { data, isLoading } = useCertificates();
  const createMutation = useCreateCertificate();
  const updateMutation = useUpdateCertificate();
  const deleteMutation = useDeleteCertificate();

  const buildPayload = (values: CertificateFormValues): CertificatePayload => ({
    title: values.title.trim(),
    issuer: values.issuer.trim(),
    company: values.company.trim(),
    issueDate: values.issueDate,
    credentialId: values.credentialId?.trim() || "",
    credentialUrl: values.credentialUrl?.trim() || "",
    imageUrl: values.imageUrl?.trim() || "",
    featured: Boolean(values.featured),
  });

  return (
    <>
      <PageHeader
        title="Certificates"
        description="Manage certificate cards, credential links, and company badges shown in your public portfolio."
        action={
          <AddButton
            label="Add Certificate"
            onClick={() => setCreateOpen(true)}
          />
        }
      />

      {isLoading ? (
        <TableSkeleton />
      ) : !data?.length ? (
        <EmptyState
          title="No Certificates"
          description="Create your first certificate to display it in the portfolio."
        />
      ) : (
        <CertificateTable
          certificates={data}
          onEdit={(certificate) => setEditing(certificate)}
          onDelete={(certificate) => setDeleting(certificate)}
        />
      )}

      {/* CREATE */}
      <FormModal
        open={createOpen}
        title="Create Certificate"
        onClose={() => setCreateOpen(false)}
      >
        <CertificateForm
          loading={createMutation.isPending}
          onSubmit={(values) => {
            createMutation.mutate(buildPayload(values), {
              onSuccess: () => {
                setCreateOpen(false);
                showSuccess("Certificate created");
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
        title="Edit Certificate"
        onClose={() => setEditing(null)}
      >
        {editing && (
          <CertificateForm
            defaultValues={{
              title: editing.title || "",
              issuer: editing.issuer || "",
              company: editing.company || "",
              issueDate: editing.issueDate || "",
              credentialId: editing.credentialId || "",
              credentialUrl: editing.credentialUrl || "",
              imageUrl: editing.imageUrl || "",
              featured: editing.featured || false,
            }}
            loading={updateMutation.isPending}
            onSubmit={(values) => {
              updateMutation.mutate(
                {
                  id: editing._id,
                  data: buildPayload(values),
                },
                {
                  onSuccess: () => {
                    setEditing(null);
                    showSuccess("Certificate updated");
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

      {/* DELETE */}
      <ConfirmDialog
        open={!!deleting}
        title="Delete Certificate"
        description="This action cannot be undone."
        onCancel={() => setDeleting(null)}
        onConfirm={() => {
          if (!deleting) return;

          deleteMutation.mutate(deleting._id, {
            onSuccess: () => {
              setDeleting(null);
              showSuccess("Certificate deleted");
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

// import { useState } from "react";

// import AddButton from "../../components/admin/AddButton";
// import ConfirmDialog from "../../components/admin/ConfirmDialog";
// import EmptyState from "../../components/admin/EmptyState";
// import FormModal from "../../components/admin/FormModal";
// import PageHeader from "../../components/admin/PageHeader";
// import TableSkeleton from "../../components/admin/TableSkeleton";
// import CertificateForm from "../../features/certificates/components/CertificateForm";
// import CertificateTable from "../../features/certificates/components/CertificateTable";
// import { useCertificates } from "../../features/certificates/hooks/useCertificates";
// import { useCreateCertificate } from "../../features/certificates/hooks/useCreateCertificate";
// import { useDeleteCertificate } from "../../features/certificates/hooks/useDeleteCertificate";
// import { useUpdateCertificate } from "../../features/certificates/hooks/useUpdateCertificate";
// import { type Certificate } from "../../features/certificates/types/certificate.types";
// import { type CertificateFormValues } from "../../features/certificates/validation/certificate.schema";
// import { showError, showSuccess } from "../../utils/toast";

// export default function Certificates() {
//   const [createOpen, setCreateOpen] = useState(false);
//   const [editing, setEditing] = useState<Certificate | null>(null);
//   const [deleting, setDeleting] = useState<Certificate | null>(null);

//   const { data, isLoading } = useCertificates();
//   const createMutation = useCreateCertificate();
//   const updateMutation = useUpdateCertificate();
//   const deleteMutation = useDeleteCertificate();

//   const buildPayload = (values: CertificateFormValues) => values;

//   return (
//     <>
//       <PageHeader
//         title="Certificates"
//         description="Manage certificates."
//         action={
//           <AddButton label="Add Certificate" onClick={() => setCreateOpen(true)} />
//         }
//       />

//       {isLoading ? (
//         <TableSkeleton />
//       ) : !data?.length ? (
//         <EmptyState
//           title="No Certificates"
//           description="Create your first certificate"
//         />
//       ) : (
//         <CertificateTable
//           certificates={data}
//           onEdit={(certificate) => setEditing(certificate)}
//           onDelete={(certificate) => setDeleting(certificate)}
//         />
//       )}

//       <FormModal
//         open={createOpen}
//         title="Create Certificate"
//         onClose={() => setCreateOpen(false)}
//       >
//         <CertificateForm
//           loading={createMutation.isPending}
//           onSubmit={(values) => {
//             createMutation.mutate(buildPayload(values), {
//               onSuccess: () => {
//                 setCreateOpen(false);
//                 showSuccess("Certificate created");
//               },
//               onError: () => showError("Create failed"),
//             });
//           }}
//         />
//       </FormModal>

//       <FormModal
//         open={!!editing}
//         title="Edit Certificate"
//         onClose={() => setEditing(null)}
//       >
//         {editing && (
//           <CertificateForm
//             defaultValues={editing}
//             loading={updateMutation.isPending}
//             onSubmit={(values) => {
//               updateMutation.mutate(
//                 { id: editing._id, data: buildPayload(values) },
//                 {
//                   onSuccess: () => {
//                     setEditing(null);
//                     showSuccess("Certificate updated");
//                   },
//                   onError: () => showError("Update failed"),
//                 },
//               );
//             }}
//           />
//         )}
//       </FormModal>

//       <ConfirmDialog
//         open={!!deleting}
//         title="Delete Certificate"
//         description="This action cannot be undone."
//         onCancel={() => setDeleting(null)}
//         onConfirm={() => {
//           if (!deleting) return;

//           deleteMutation.mutate(deleting._id, {
//             onSuccess: () => {
//               setDeleting(null);
//               showSuccess("Certificate deleted");
//             },
//             onError: () => showError("Delete failed"),
//           });
//         }}
//       />
//     </>
//   );
// }
