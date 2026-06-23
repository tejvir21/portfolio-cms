import Certificate from "../models/Certificate";

import {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} from "../utils/crudFactory";

export const createCertificate = createOne(Certificate);

export const getCertificates = getAll(Certificate);

export const getCertificate = getOne(Certificate);

export const updateCertificate = updateOne(Certificate);

export const deleteCertificate = deleteOne(Certificate);
