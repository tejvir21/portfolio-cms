import Experience from "../models/Experience";

import {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} from "../utils/crudFactory";

export const createExperience = createOne(Experience);

export const getExperiences = getAll(Experience);

export const getExperience = getOne(Experience);

export const updateExperience = updateOne(Experience);

export const deleteExperience = deleteOne(Experience);
