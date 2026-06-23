import Contact from "../models/Contact";

import { createOne, getAll, deleteOne } from "../utils/crudFactory";

export const createContact = createOne(Contact);

export const getContacts = getAll(Contact);

export const deleteContact = deleteOne(Contact);
